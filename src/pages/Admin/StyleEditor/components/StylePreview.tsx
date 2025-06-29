import React, { useRef, useEffect, useState } from 'react';
import { StoryStyleConfig, convertToReactStyle, convertContainerToReactStyle } from '../../../../types/styleConfig';

interface StylePreviewProps {
  config: StoryStyleConfig;
  pageType: 'cover' | 'page' | 'dedicatoria';
  sampleImage: string;
  sampleText: string;
  showGrid: boolean;
  showRulers: boolean;
  zoomLevel: number;
}

const StylePreview: React.FC<StylePreviewProps> = ({
  config,
  pageType,
  sampleImage,
  sampleText,
  showGrid,
  showRulers,
  zoomLevel
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = zoomLevel / 100;
  const [dimensions, setDimensions] = useState({ width: 1536, height: 1024 });

  // Calcular dimensiones responsivas
  useEffect(() => {
    const updateDimensions = () => {
      const container = containerRef.current?.parentElement;
      if (!container) return;
      
      const { width: containerWidth } = container.getBoundingClientRect();
      const padding = 64; // 4rem total (2rem cada lado)
      const availableWidth = containerWidth - padding;
      
      // Mantener aspect ratio 3:2
      const aspectRatio = 3/2;
      const maxWidth = 1536;
      const maxHeight = 1024;
      
      // Calcular basado en el ancho disponible
      let width = Math.min(availableWidth, maxWidth);
      let height = width / aspectRatio;
      
      // Si la altura calculada excede el máximo, ajustar por altura
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
      
      // Para móviles, usar el 100% del ancho disponible
      if (window.innerWidth < 768) {
        width = availableWidth;
        height = width / aspectRatio;
      }
      
      setDimensions({ 
        width: Math.floor(width), 
        height: Math.floor(height) 
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [zoomLevel]);

  // Obtener configuración actual según tipo de página
  const currentConfig = 
    pageType === 'cover' ? config.coverConfig.title :
    pageType === 'dedicatoria' ? (config.dedicatoriaConfig?.text || config.pageConfig.text) :
    config.pageConfig.text;
  const textStyle = convertToReactStyle(currentConfig);
  const containerStyle = convertContainerToReactStyle(currentConfig.containerStyle);

  // Calcular posición del contenedor
  const getContainerPosition = () => {
    const position = currentConfig.position;
    const horizontalPosition = currentConfig.horizontalPosition || 'center';
    let alignItems = 'center';
    let justifyContent = 'center';

    // Posición vertical
    switch (position) {
      case 'top':
        alignItems = 'flex-start';
        break;
      case 'center':
        alignItems = 'center';
        break;
      case 'bottom':
        alignItems = 'flex-end';
        break;
    }

    // Posición horizontal del contenedor
    switch (horizontalPosition) {
      case 'left':
        justifyContent = 'flex-start';
        break;
      case 'center':
        justifyContent = 'center';
        break;
      case 'right':
        justifyContent = 'flex-end';
        break;
    }

    return { alignItems, justifyContent };
  };

  const positionStyles = getContainerPosition();

  // Sin overlay de gradiente
  const overlayStyle = null;

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Grid Overlay */}
      {showGrid && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(147, 51, 234, 0.2)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}

      {/* Rulers */}
      {showRulers && (
        <>
          {/* Horizontal Ruler */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 z-30">
            <div className="relative h-full">
              {Array.from({ length: 40 }, (_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute top-0 w-px bg-gray-400 dark:bg-gray-500"
                  style={{ 
                    left: `${i * 50}px`,
                    height: i % 5 === 0 ? '100%' : '50%'
                  }}
                >
                  {i % 5 === 0 && i > 0 && (
                    <span className="absolute -top-1 -left-3 text-xs text-gray-600 dark:text-gray-400">
                      {i * 50}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Ruler */}
          <div className="absolute top-0 left-0 bottom-0 w-6 bg-gray-100 dark:bg-gray-700 border-r border-gray-300 dark:border-gray-600 z-30">
            <div className="relative w-full h-full">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute left-0 h-px bg-gray-400 dark:bg-gray-500"
                  style={{ 
                    top: `${i * 50}px`,
                    width: i % 5 === 0 ? '100%' : '50%'
                  }}
                >
                  {i % 5 === 0 && i > 0 && (
                    <span className="absolute -left-1 -top-2 text-xs text-gray-600 dark:text-gray-400 -rotate-90 origin-left">
                      {i * 50}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Preview Container */}
      <div 
        ref={containerRef}
        className="relative"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          marginLeft: showRulers ? '1.5rem' : 0,
          marginTop: showRulers ? '1.5rem' : 0,
        }}
      >
        {/* Page Container */}
        <div 
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            backgroundImage: `url(${sampleImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Gradient Overlay (for pages) */}
          {overlayStyle && <div style={overlayStyle} />}

          {/* Text Container */}
          <div 
            className="absolute inset-0 flex p-8"
            style={{
              ...positionStyles,
              padding: pageType === 'page' ? '0' : '2rem'
            }}
          >
            <div
              className="relative"
              style={{
                ...containerStyle,
                ...(pageType === 'page' && currentConfig.position === 'bottom' ? {
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  width: '100%'
                } : {})
              }}
            >
              {pageType === 'cover' ? (
                <h1 style={textStyle}>
                  {sampleText}
                </h1>
              ) : pageType === 'dedicatoria' ? (
                <div style={textStyle}>
                  {sampleText}
                </div>
              ) : (
                <p style={textStyle}>
                  {sampleText}
                </p>
              )}
            </div>
          </div>

          {/* Position Indicators */}
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {pageType === 'cover' ? 'Portada' : 
             pageType === 'dedicatoria' ? 'Dedicatoria' : 
             'Página Interior'}
          </div>
        </div>
      </div>

      {/* Zoom Indicator */}
      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        {zoomLevel}%
      </div>
    </div>
  );
};

export default StylePreview;