import { useMemo, useCallback } from 'react';
import { ComponentConfig, TextComponentConfig, ImageComponentConfig, StoryStyleConfig, PageType } from '../types/styleConfig';

// Tipos para el sistema de selección
export interface SelectionTarget {
  type: 'page' | 'component';
  componentId?: string;
  componentName?: string;
  componentType?: string;
}

// Interfaz unificada para estilos
export interface UnifiedStyleConfig {
  // Typography
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: string;
  
  // Colors
  color?: string;
  textShadow?: string;
  
  // Position & Layout
  position?: string;
  horizontalPosition?: string;
  
  // Effects & Container
  backgroundColor?: string;
  borderRadius?: string;
  padding?: string;
  opacity?: number;
  boxShadow?: string;
  backdropFilter?: string;
  border?: string;
  
  // Image specific
  objectFit?: string;
  width?: string;
  height?: string;
  size?: 'small' | 'medium' | 'large' | 'custom';
  
  // Component specific
  content?: string;
  imageUrl?: string;
}

export interface StyleAdapterReturn {
  /** Estilos actuales del elemento seleccionado */
  currentStyles: UnifiedStyleConfig;
  
  /** Función para actualizar estilos */
  updateStyles: (updates: Partial<UnifiedStyleConfig>) => void;
  
  /** Información del elemento seleccionado */
  selectionInfo: {
    type: 'page' | 'component';
    name: string;
    canEdit: {
      typography: boolean;
      colors: boolean;
      position: boolean;
      effects: boolean;
      container: boolean;
    };
  };
}

/**
 * Hook para adaptar estilos entre página y componentes
 * Permite que los paneles de estilo existentes trabajen con ambas estructuras
 */
export const useStyleAdapter = (
  selectedTarget: SelectionTarget,
  config: StoryStyleConfig | null,
  pageType: PageType,
  components: ComponentConfig[],
  onConfigChange: (updates: Partial<StoryStyleConfig>) => void,
  onComponentChange: (componentId: string, updates: Partial<ComponentConfig>) => void
): StyleAdapterReturn => {
  
  // Obtener el componente seleccionado si aplica
  const selectedComponent = useMemo(() => {
    if (selectedTarget.type === 'component' && selectedTarget.componentId) {
      return components.find(c => c.id === selectedTarget.componentId);
    }
    return null;
  }, [selectedTarget, components]);
  
  // Mapear estilos de página a formato unificado
  const mapPageStylesToUnified = useCallback((config: StoryStyleConfig | null, pageType: PageType): UnifiedStyleConfig => {
    if (!config) return {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1rem',
      fontWeight: '400',
      color: '#000000',
      textAlign: 'left',
      textShadow: 'none'
    };
    
    const getPageConfig = () => {
      switch (pageType) {
        case 'cover': return config.coverConfig?.title;
        case 'page': return config.pageConfig?.text;
        case 'dedicatoria': return config.dedicatoriaConfig?.text;
        case 'contraportada': return config.contraportadaConfig?.text;
        default: return config.pageConfig?.text;
      }
    };
    
    const pageConfig = getPageConfig();
    if (!pageConfig) return {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1rem',
      fontWeight: '400',
      color: '#000000',
      textAlign: 'left',
      textShadow: 'none'
    };
    
    return {
      fontFamily: pageConfig.fontFamily || 'Inter, sans-serif',
      fontSize: pageConfig.fontSize || '1rem',
      fontWeight: pageConfig.fontWeight || '400',
      textAlign: pageConfig.textAlign || 'left',
      lineHeight: pageConfig.lineHeight,
      letterSpacing: pageConfig.letterSpacing,
      textTransform: pageConfig.textTransform,
      color: pageConfig.color || '#000000',
      textShadow: pageConfig.textShadow || 'none',
      position: pageConfig.position,
      backgroundColor: pageConfig.containerStyle?.background,
      borderRadius: pageConfig.containerStyle?.borderRadius,
      padding: pageConfig.containerStyle?.padding,
      boxShadow: pageConfig.containerStyle?.boxShadow,
      backdropFilter: pageConfig.containerStyle?.backdropFilter,
      border: pageConfig.containerStyle?.border,
      opacity: 1
    };
  }, []);
  
  // Mapear estilos de componente a formato unificado
  const mapComponentStylesToUnified = useCallback((component: ComponentConfig | null): UnifiedStyleConfig => {
    if (!component) return {};
    
    if (component.type === 'text') {
      const textComp = component as TextComponentConfig;
      return {
        fontFamily: textComp.style?.fontFamily || 'Inter, sans-serif',
        fontSize: textComp.style?.fontSize || '1rem',
        fontWeight: textComp.style?.fontWeight || '400',
        textAlign: textComp.style?.textAlign || 'left',
        lineHeight: textComp.style?.lineHeight,
        letterSpacing: textComp.style?.letterSpacing,
        textTransform: textComp.style?.textTransform,
        color: textComp.style?.color || '#000000',
        textShadow: textComp.style?.textShadow || 'none',
        position: textComp.position,
        horizontalPosition: textComp.horizontalPosition,
        backgroundColor: textComp.style?.backgroundColor,
        borderRadius: textComp.style?.borderRadius,
        padding: textComp.style?.padding,
        boxShadow: textComp.style?.boxShadow,
        border: textComp.style?.border,
        backdropFilter: textComp.style?.backdropFilter,
        opacity: textComp.style?.opacity || 1,
        content: textComp.content
      };
    }
    
    if (component.type === 'image') {
      const imgComp = component as ImageComponentConfig;
      return {
        position: imgComp.position,
        horizontalPosition: imgComp.horizontalPosition,
        width: imgComp.width,
        height: imgComp.height,
        objectFit: imgComp.objectFit,
        size: imgComp.size,
        borderRadius: imgComp.style?.borderRadius,
        boxShadow: imgComp.style?.boxShadow,
        border: imgComp.style?.border,
        backdropFilter: imgComp.style?.backdropFilter,
        opacity: imgComp.style?.opacity || 1,
        imageUrl: imgComp.url
      };
    }
    
    return {};
  }, []);
  
  // Obtener estilos actuales basados en la selección
  const currentStyles = useMemo(() => {
    if (selectedTarget.type === 'page') {
      return mapPageStylesToUnified(config, pageType);
    }
    return mapComponentStylesToUnified(selectedComponent || null);
  }, [selectedTarget, config, pageType, selectedComponent, mapPageStylesToUnified, mapComponentStylesToUnified]);
  
  // Función para actualizar estilos
  const updateStyles = useCallback((updates: Partial<UnifiedStyleConfig>) => {
    if (selectedTarget.type === 'page') {
      // Actualizar configuración de página
      const pageUpdates: any = {};
      
      // Mapear updates de vuelta a estructura de página
      if (updates.fontFamily !== undefined) pageUpdates.fontFamily = updates.fontFamily;
      if (updates.fontSize !== undefined) pageUpdates.fontSize = updates.fontSize;
      if (updates.fontWeight !== undefined) pageUpdates.fontWeight = updates.fontWeight;
      if (updates.textAlign !== undefined) pageUpdates.textAlign = updates.textAlign;
      if (updates.lineHeight !== undefined) pageUpdates.lineHeight = updates.lineHeight;
      if (updates.letterSpacing !== undefined) pageUpdates.letterSpacing = updates.letterSpacing;
      if (updates.textTransform !== undefined) pageUpdates.textTransform = updates.textTransform;
      if (updates.color !== undefined) pageUpdates.color = updates.color;
      if (updates.textShadow !== undefined) pageUpdates.textShadow = updates.textShadow;
      if (updates.position !== undefined) pageUpdates.position = updates.position;
      
      // Container styles
      const containerUpdates: any = {};
      if (updates.backgroundColor !== undefined) containerUpdates.background = updates.backgroundColor;
      if (updates.borderRadius !== undefined) containerUpdates.borderRadius = updates.borderRadius;
      if (updates.padding !== undefined) containerUpdates.padding = updates.padding;
      if (updates.boxShadow !== undefined) containerUpdates.boxShadow = updates.boxShadow;
      if (updates.backdropFilter !== undefined) containerUpdates.backdropFilter = updates.backdropFilter;
      if (updates.border !== undefined) containerUpdates.border = updates.border;
      
      if (Object.keys(containerUpdates).length > 0) {
        pageUpdates.containerStyle = { ...config?.[`${pageType}Config`]?.text?.containerStyle, ...containerUpdates };
      }
      
      // Aplicar actualizaciones según el tipo de página
      const configUpdates: Partial<StoryStyleConfig> = {};
      if (pageType === 'cover') {
        configUpdates.coverConfig = {
          ...config?.coverConfig,
          title: { ...config?.coverConfig?.title, ...pageUpdates }
        };
      } else if (pageType === 'page') {
        configUpdates.pageConfig = {
          ...config?.pageConfig,
          text: { ...config?.pageConfig?.text, ...pageUpdates }
        };
      } else if (pageType === 'dedicatoria') {
        configUpdates.dedicatoriaConfig = {
          ...config?.dedicatoriaConfig,
          text: { ...config?.dedicatoriaConfig?.text, ...pageUpdates }
        };
      }
      
      onConfigChange(configUpdates);
    } else if (selectedTarget.type === 'component' && selectedTarget.componentId) {
      // Actualizar componente
      const componentUpdates: Partial<ComponentConfig> = {};
      
      if (selectedComponent?.type === 'text') {
        const styleUpdates: any = {};
        
        // Mapear updates de vuelta a estructura de componente
        if (updates.fontFamily !== undefined) styleUpdates.fontFamily = updates.fontFamily;
        if (updates.fontSize !== undefined) styleUpdates.fontSize = updates.fontSize;
        if (updates.fontWeight !== undefined) styleUpdates.fontWeight = updates.fontWeight;
        if (updates.textAlign !== undefined) styleUpdates.textAlign = updates.textAlign;
        if (updates.lineHeight !== undefined) styleUpdates.lineHeight = updates.lineHeight;
        if (updates.letterSpacing !== undefined) styleUpdates.letterSpacing = updates.letterSpacing;
        if (updates.textTransform !== undefined) styleUpdates.textTransform = updates.textTransform;
        if (updates.color !== undefined) styleUpdates.color = updates.color;
        if (updates.textShadow !== undefined) styleUpdates.textShadow = updates.textShadow;
        if (updates.backgroundColor !== undefined) styleUpdates.backgroundColor = updates.backgroundColor;
        if (updates.borderRadius !== undefined) styleUpdates.borderRadius = updates.borderRadius;
        if (updates.padding !== undefined) styleUpdates.padding = updates.padding;
        if (updates.boxShadow !== undefined) styleUpdates.boxShadow = updates.boxShadow;
        if (updates.border !== undefined) styleUpdates.border = updates.border;
        if (updates.backdropFilter !== undefined) styleUpdates.backdropFilter = updates.backdropFilter;
        if (updates.opacity !== undefined) styleUpdates.opacity = updates.opacity;
        
        if (Object.keys(styleUpdates).length > 0) {
          componentUpdates.style = { ...(selectedComponent as TextComponentConfig).style, ...styleUpdates };
        }
        
        if (updates.position !== undefined) componentUpdates.position = updates.position;
        if (updates.horizontalPosition !== undefined) componentUpdates.horizontalPosition = updates.horizontalPosition;
        if (updates.content !== undefined) (componentUpdates as Partial<TextComponentConfig>).content = updates.content;
      } else if (selectedComponent?.type === 'image') {
        const styleUpdates: any = {};
        
        if (updates.borderRadius !== undefined) styleUpdates.borderRadius = updates.borderRadius;
        if (updates.boxShadow !== undefined) styleUpdates.boxShadow = updates.boxShadow;
        if (updates.border !== undefined) styleUpdates.border = updates.border;
        if (updates.backdropFilter !== undefined) styleUpdates.backdropFilter = updates.backdropFilter;
        if (updates.opacity !== undefined) styleUpdates.opacity = updates.opacity;
        
        if (Object.keys(styleUpdates).length > 0) {
          componentUpdates.style = { ...(selectedComponent as ImageComponentConfig).style, ...styleUpdates };
        }
        
        if (updates.position !== undefined) componentUpdates.position = updates.position;
        if (updates.horizontalPosition !== undefined) componentUpdates.horizontalPosition = updates.horizontalPosition;
        if (updates.width !== undefined) (componentUpdates as Partial<ImageComponentConfig>).width = updates.width;
        if (updates.height !== undefined) (componentUpdates as Partial<ImageComponentConfig>).height = updates.height;
        if (updates.objectFit !== undefined) (componentUpdates as Partial<ImageComponentConfig>).objectFit = updates.objectFit;
        if (updates.size !== undefined) (componentUpdates as Partial<ImageComponentConfig>).size = updates.size;
        if (updates.imageUrl !== undefined) (componentUpdates as Partial<ImageComponentConfig>).url = updates.imageUrl;
      }
      
      onComponentChange(selectedTarget.componentId, componentUpdates);
    }
  }, [selectedTarget, selectedComponent, config, pageType, onConfigChange, onComponentChange]);
  
  // Información de selección
  const selectionInfo = useMemo(() => {
    const isPage = selectedTarget.type === 'page';
    const isTextComponent = selectedComponent?.type === 'text';
    const isImageComponent = selectedComponent?.type === 'image';
    
    return {
      type: selectedTarget.type,
      name: isPage ? `Página ${pageType}` : (selectedTarget.componentName || 'Componente'),
      canEdit: {
        typography: isPage || isTextComponent,
        colors: isPage || isTextComponent,
        position: true,
        effects: isPage || isTextComponent || isImageComponent,
        container: isPage || isTextComponent || isImageComponent
      }
    };
  }, [selectedTarget, selectedComponent, pageType]);
  
  return {
    currentStyles,
    updateStyles,
    selectionInfo
  };
};