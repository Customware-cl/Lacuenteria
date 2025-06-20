import React, { useEffect, useState } from 'react';
import { useWizard } from '../../../context/WizardContext';
import { useStory } from '../../../context/StoryContext';
import { useParams } from 'react-router-dom';
import { visualStyleOptions } from '../../../types';
import { Palette, Check, Loader } from 'lucide-react';
import { getOptimizedImageUrl } from '../../../lib/image';
import { characterService } from '../../../services/characterService';
import { storyService } from '../../../services/storyService';
import { ThumbnailStyle } from '../../../types/character';

const STYLE_TO_KEY: Record<string, ThumbnailStyle | 'default'> = {
  default: 'default',
  acuarela: 'acuarela',
  bordado: 'bordado',
  kawaii: 'kawaii',
  dibujado: 'mano',
  recortes: 'recortes',
};

const FALLBACK_IMAGES: Record<string, string> = {
  default: 'storage/fallback-images/miniatura.jpeg',
  acuarela: 'storage/fallback-images/miniatura_acuarela.png',
  bordado: 'storage/fallback-images/miniatura_bordado.png',
  kawaii: 'storage/fallback-images/miniatura_kawaii.png',
  dibujado: 'storage/fallback-images/miniatura_mano.png',
  recortes: 'storage/fallback-images/miniatura_recortes.png',
};

const DesignStep: React.FC = () => {
  const { designSettings, setDesignSettings, characters } = useWizard();
  const { covers } = useStory();
  const { storyId } = useParams();
  const [images, setImages] = useState<Record<string, string>>({});
  const coverState = storyId ? covers[storyId] : undefined;

  const selectedStyle = designSettings.visualStyle;
  const rawPreviewUrl =
    (selectedStyle &&
      (coverState?.variants?.[selectedStyle] ||
        (selectedStyle === 'default' ? coverState?.url : undefined))) ||
    (selectedStyle ? images[STYLE_TO_KEY[selectedStyle]] : undefined) ||
    (selectedStyle ? FALLBACK_IMAGES[selectedStyle] : undefined);

  const previewUrl = rawPreviewUrl
    ? getOptimizedImageUrl(rawPreviewUrl, { width: 512, quality: 80, format: 'webp' })
    : undefined;

  // Get individual variant status for each style
  const getVariantStatus = (styleValue: string) => {
    if (styleValue === 'default') {
      return coverState?.status || 'idle';
    }
    return coverState?.variantStatus?.[styleValue] || 'idle';
  };

  // Check if selected style is currently generating
  const isSelectedStyleGenerating = selectedStyle && getVariantStatus(selectedStyle) === 'generating';

  useEffect(() => {
    const load = async () => {
      if (!characters.length) return;
      const character = characters[0];
      const map: Record<string, string> = { default: character.thumbnailUrl || '' };
      try {
        const thumbs = await characterService.getThumbnailsByCharacter(character.id);
        thumbs.forEach(t => {
          map[t.style_type] = t.url;
        });
      } catch (err) {
        console.error('Error loading thumbnails', err);
      }
      setImages(map);
    };

    load();
  }, [characters]);

  const handleChange = async (field: string, value: string) => {
    setDesignSettings({
      ...designSettings,
      [field]: value,
    });

    if (field === 'visualStyle' && storyId) {
      try {
        await storyService.upsertStoryDesign(storyId, {
          visualStyle: value,
          colorPalette: designSettings.colorPalette
        });
      } catch (error) {
        console.error('Error persisting visual style:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">Diseño Visual</h2>
        <p className="text-gray-600">
          Personaliza el aspecto visual de tu cuento
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estilo visual
            </label>
            <div className="grid grid-cols-2 gap-4">
              {visualStyleOptions.map((option) => {
                const key = STYLE_TO_KEY[option.value];
                const src = getOptimizedImageUrl(
                  images[key] || FALLBACK_IMAGES[option.value],
                  { width: 256, quality: 80, format: 'webp' }
                );
                const hasCover =
                  option.value === 'default'
                    ? !!coverState?.url
                    : !!coverState?.variants?.[option.value];
                const variantStatus = getVariantStatus(option.value);
                const isGenerating = variantStatus === 'generating';
                const hasError = variantStatus === 'error';
                
                return (
                  <div
                    key={option.value}
                    onClick={() => handleChange('visualStyle', option.value)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all flex flex-col items-center relative ${
                      designSettings.visualStyle === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <div className="w-full aspect-square mb-2 overflow-hidden rounded-md bg-gray-100 relative">
                      <img
                        src={src}
                        alt={option.label}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Individual loading state for this style */}
                      {isGenerating && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                          <Loader className="w-6 h-6 text-purple-600 animate-spin" />
                        </div>
                      )}
                      
                      {/* Success indicator */}
                      {hasCover && !isGenerating && (
                        <span className="absolute top-1 right-1 text-purple-600 bg-white/80 rounded-full p-0.5">
                          <Check className="w-4 h-4" />
                        </span>
                      )}
                      
                      {/* Error indicator */}
                      {hasError && (
                        <span className="absolute top-1 right-1 text-red-600 bg-white/80 rounded-full p-0.5">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 text-center">{option.label}</h3>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-purple-800">
              Vista previa del estilo
            </h3>
          </div>

          <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-md flex items-center justify-center relative">
            {selectedStyle ? (
              <>
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                
                {/* Loading state for selected style in preview */}
                {isSelectedStyleGenerating && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                    <Loader className="w-8 h-8 text-purple-600 animate-spin" />
                    <p className="text-sm text-purple-600 font-medium">
                      Generando portada...
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-6 text-center">
                <p className="text-gray-500">
                  Selecciona un estilo visual para ver una vista previa
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStep;