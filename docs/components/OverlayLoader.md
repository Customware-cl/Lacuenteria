# 🔄 OverlayLoader

Componente que muestra un overlay de carga con mensajes rotativos y spinner.

## Props

```typescript
interface OverlayLoaderProps {
  etapa: Etapa;
  context?: Record<string, string>;
  timeoutMs?: number;
  onTimeout?: () => void;
  onCancel?: () => void;
  progress?: { current: number; total: number };
}
```

- **etapa**: etapa del flujo para filtrar los mensajes.
- **context**: variables para interpolar en los mensajes.
- **timeoutMs**: tiempo máximo antes de disparar `onTimeout`.
- **onCancel**: callback para cancelar la operación.
- **progress**: objeto con el progreso actual y total.

El componente utiliza `aria-live="polite"` para informar a lectores de pantalla y es totalmente responsive.
