import { logPromptMetric } from '../_shared/metrics.ts';
import { generateWithFlux } from '../_shared/flux.ts';
import { generateWithOpenAI } from '../_shared/openai.ts';

import { configureForEdgeFunction, captureException, setUser, setTags } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Character {
  name: string;
  age: string;
  description: string;
  referenceUrls: string[];
}

interface SceneRequest {
  characters: Character[];
  scene: {
    background: string;
    action: string;
    visualStyle: string;
    colorPalette: string;
  };
}

function buildCharacterBlock(character: Character) {
  return `
Nombre: ${character.name}
Edad/apariencia: ${character.age}
Ropa base: ${character.description}
Personalidad: ${character.description}`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Set up configurable defaults at function scope
  const defaultSize = Deno.env.get('DEFAULT_IMAGE_SIZE') || '1024x1024';
  const defaultQuality = Deno.env.get('DEFAULT_IMAGE_QUALITY') || 'standard';
  const defaultModel = Deno.env.get('DEFAULT_IMAGE_MODEL') || 'gpt-image-1';

  try {
    const { characters, scene }: SceneRequest = await req.json();


    // Build identity blocks
    const identityBlocks = characters.map(buildCharacterBlock).join('\n\n');

    // Build scene block
    const sceneBlock = `
Escenario o fondo: ${scene.background}
Acción o pose: ${scene.action}
Mantén los rasgos físicos y la ropa exactamente como en la referencia.
Estilo gráfico: ${scene.visualStyle}
Paleta de color: ${scene.colorPalette}
Ilustración para libro infantil. Formato panorámico si es spread.`;

    // Generate scene image using max 2 reference images per character
    const start = Date.now();
    
    const payload = {
      model: defaultModel,
      prompt: `${identityBlocks}\n${sceneBlock}`,
      referenced_image_ids: characters.flatMap((char) =>
        char.referenceUrls.slice(0, 2)
      ),
      size: defaultSize,
      quality: defaultQuality,
      n: 1,
    };
    console.log('[generate-scene] [REQUEST]', JSON.stringify(payload));
    let imageUrl = '';
    if (Deno.env.get('FLUX_ENDPOINT')) {
      imageUrl = await generateWithFlux(`${identityBlocks}\n${sceneBlock}`);
    } else {
      const { url } = await generateWithOpenAI({
        endpoint: 'https://api.openai.com/v1/images/generations',
        payload,
      });
      imageUrl = url;
    }
    const elapsed = Date.now() - start;
    await logPromptMetric({
      modelo_ia: defaultModel,
      tiempo_respuesta_ms: elapsed,
      estado: imageUrl ? 'success' : 'error',
      error_type: imageUrl ? null : 'service_error',
      actividad: 'generar_escena',
      edge_function: 'generate-scene',
    });

    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    await logPromptMetric({
      modelo_ia: defaultModel,
      tiempo_respuesta_ms: 0,
      estado: 'error',
      error_type: 'service_error',
      metadatos: { error: (error as Error).message },
      actividad: 'generar_escena',
      edge_function: 'generate-scene',
    });
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});