import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { encode as base64Encode } from "https://deno.land/std@0.203.0/encoding/base64.ts";
const FILE = 'analyze-character';
const STAGE = 'personaje';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
const handleOpenAIError = (error)=>{
  if (error.response?.status === 429) {
    return {
      status: 429,
      message: 'Límite de solicitudes excedido. Por favor, intenta de nuevo en unos minutos.'
    };
  }
  return {
    status: 500,
    message: error.message || 'Error al analizar el personaje'
  };
};
async function fetchImageAsBase64(imageUrl) {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    // 1) URL externa → fetch directo
    if (!imageUrl.includes(supabaseUrl)) {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const base64 = base64Encode(bytes);
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      return `data:${contentType};base64,${base64}`;
    }
    // 2) URL de Supabase Storage → descarga vía SDK
    const url = new URL(imageUrl);
    const parts = url.pathname.split('/');
    const publicIndex = parts.indexOf('public');
    if (publicIndex === -1 || publicIndex + 2 >= parts.length) {
      throw new Error('Invalid Supabase storage URL format');
    }
    const bucketName = parts[publicIndex + 1];
    const filePath = parts.slice(publicIndex + 2).join('/');
    console.log(`[${FILE}] [fetchImageAsBase64] Fetching from bucket: ${bucketName}, path: ${filePath}`);
    const supabaseAdmin = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    const { data: blob, error } = await supabaseAdmin.storage.from(bucketName).download(filePath);
    if (error) {
      console.error(`[${FILE}] [fetchImageAsBase64] Supabase storage error:`, error);
      throw new Error(`Failed to download from Supabase storage: ${error.message}`);
    }
    if (!blob) {
      throw new Error('No data received from Supabase storage');
    }
    const buffer = await blob.arrayBuffer();
    const bytes2 = new Uint8Array(buffer);
    const base642 = base64Encode(bytes2);
    const contentType2 = blob.type || 'image/jpeg';
    return `data:${contentType2};base64,${base642}`;
  } catch (err) {
    console.error(`[${FILE}] [fetchImageAsBase64] Error fetching image:`, err);
    throw err;
  }
}
Deno.serve(async (req)=>{
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    const { imageUrl, name, age, description: sanitizedNotes } = await req.json();
    if (!imageUrl) {
      throw new Error('No image URL provided');
    }
    const analysisPrompt = Deno.env.get('PROMPT_DESCRIPCION_PERSONAJE');
    if (!analysisPrompt) {
      throw new Error('Error de configuración: Falta el prompt de análisis de personaje');
    }
    console.log(`[${FILE}] [INIT] Attempting to fetch image: ${imageUrl}`);
    const base64Image = await fetchImageAsBase64(imageUrl);
    const prompt = analysisPrompt.replace('{name}', name || '').replace('${sanitizedAge}', age?.toString() || '').replace('${sanitizedNotes}', sanitizedNotes || '');
    const requestBody = {
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image
              }
            }
          ]
        }
      ],
      max_tokens: 1500,
      response_format: {
        type: "json_object"
      }
    };
    console.log(`[${FILE}] [${STAGE}] [IN]  ${JSON.stringify(requestBody)}`);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    const responseData = await response.json();
    console.log(`[${FILE}] [${STAGE}] [OUT] ${JSON.stringify(responseData)}`);
    if (!response.ok) {
      const errorInfo = handleOpenAIError({
        response,
        message: responseData.error?.message
      });
      return new Response(JSON.stringify({
        error: errorInfo.message
      }), {
        status: errorInfo.status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    if (!responseData.choices?.[0]?.message?.content) {
      throw new Error('No analysis result received from OpenAI');
    }
    const description = JSON.parse(responseData.choices[0].message.content);
    return new Response(JSON.stringify({
      description
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(`[${FILE}] [ERROR]`, error);
    const errResp = handleOpenAIError(error);
    return new Response(JSON.stringify({
      error: errResp.message
    }), {
      status: errResp.status,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
