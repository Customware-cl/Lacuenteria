# Changelog

## Unreleased
- Portada principal desbloquea el paso de Diseño sin esperar las variantes. Los mensajes de `stories.loader` se muestran cada 5 s durante la generación.
- Added `generate-story` Edge Function for story creation and cover generation.
- UI now displays generated covers on home.
- Documentation added at `docs/tech/story-generation.md`.
- Wizard state now persists in Supabase and localStorage allowing users to resume drafts exactly where they left off. See `docs/flow/wizard-states.md`.
- Fixed a reference error when initializing `setStoryId` inside `WizardContext`.
- Admin panel now guarda la configuración de cada actividad y muestra métricas de los últimos 10 minutos.
- Nuevas columnas `actividad` y `edge_function` en `prompt_metrics`.
- Nueva función `generate-cover-variant` para crear variantes de portada y mostrarlas en el paso de diseño. Documentado en `docs/tech/generate-cover-variant.md` y `docs/components/DesignStep.md`.
- Las funciones Edge ahora imprimen en consola el JSON enviado a las APIs de IA.
- Se corrige `describe-and-sketch` para soportar Flux y definir la constante `FILE`.
- Corregida la conversión a base64 de la imagen de referencia en `describe-and-sketch`.
- Arreglado el reemplazo del placeholder `${sanitizedNotes}` en el prompt de `describe-and-sketch`.
- Las funciones que usan Flux ahora devuelven la imagen en base64 para evitar errores CORS al descargar la URL firmada.
- Nuevo helper `generateWithFlux` para conectar con Flux desde las Edge Functions.
- Todas las funciones de generación de imágenes detectan el uso de Flux y emplean este helper automáticamente.
- Nuevo helper `generateWithOpenAI` para centralizar las llamadas a la API de imágenes de OpenAI.
- `generate-story` y `generate-cover` ahora registran llamadas en `inflight_calls` para mostrarse como activas.
- `StageActivityCard` usa un gráfico de área apilada para visualizar éxitos y errores de la última hora. Ver `docs/components/StageActivityCard.md`.
- `generate-cover-variant` ahora recibe `storyId` y `styleKey`, guarda la imagen en Supabase y devuelve la URL pública.
- Se muestra la actividad **portada_variante** en `/admin/flujo` para controlar la generación de variantes de portada.
