# Sistema de Monitoreo con Sentry para Edge Functions

## Resumen

Se implementó un sistema completo de monitoreo de errores con Sentry para todas las Edge Functions de Supabase, proporcionando visibilidad total sobre errores, performance y debugging avanzado.

## Arquitectura

### Utilidad Compartida (`_shared/sentry.ts`)

**Características principales:**
- ✅ Compatible con Deno (runtime de Supabase Edge Functions)
- ✅ API Universal de Sentry sin dependencias pesadas
- ✅ Manejo robusto de errores de conectividad
- ✅ Contexto enriquecido automático
- ✅ Breadcrumbs para tracking de flujo
- ✅ Wrapper `withErrorCapture` para operaciones críticas

**Funcionalidades implementadas:**
```typescript
// Configuración automática por función
configureForEdgeFunction(functionName, request)

// Captura de errores con contexto
await captureException(error, context)

// Mensajes con niveles
await captureMessage(message, level, extra)

// Contexto de usuario
setUser({ id: userId })

// Tags personalizados
setTags({ 'story.id': storyId })

// Breadcrumbs para debugging
addBreadcrumb(message, category, level, data)

// Wrapper para operaciones críticas
await withErrorCapture(operation, name, context)
```

### Variables de Entorno

**Configuradas en `.env`:**
```bash
SENTRY_DSN=https://bad6a4370229b09e6897329d974f30b2@o4509578325524480.ingest.us.sentry.io/4509578341056512
DENO_ENV=development
```

**En `supabase/config.toml`:**
```toml
[edge_runtime.secrets]
SENTRY_DSN = "env(SENTRY_DSN)"
DENO_ENV = "env(DENO_ENV)"
```

## Implementación por Función

### Nivel 1 - Crítico (Implementación Completa)

#### 1. `generate-story`
**Monitoreo implementado:**
- ✅ Configuración automática de función y request
- ✅ Contexto de usuario y tags específicos
- ✅ Monitoreo de llamadas a OpenAI con `withErrorCapture`
- ✅ Captura de errores en catch principal
- ✅ Breadcrumbs para tracking de flujo

**Tags específicos:**
- `story.id`: ID del cuento
- `characters.count`: Número de personajes
- `theme`: Tema del cuento
- `model`: Modelo de IA utilizado

#### 2. `story-export`
**Monitoreo implementado:**
- ✅ Configuración completa de Sentry
- ✅ Monitoreo de operaciones críticas:
  - Obtención de datos del cuento
  - Generación de PDF
  - Upload a Storage
  - Actualización de estado
- ✅ Breadcrumbs detallados por etapa
- ✅ Manejo especial de errores no críticos

**Tags específicos:**
- `story.id`: ID del cuento
- `export.format`: Formato de exportación
- `export.save_to_library`: Si se guarda en biblioteca
- `export.include_metadata`: Si incluye metadatos

#### 3. `generate-cover`
**Monitoreo implementado:**
- ✅ Configuración automática
- ✅ Monitoreo de descarga de imágenes de personajes
- ✅ Tracking de generación de portada
- ✅ Manejo de múltiples reintentos
- ✅ Contexto enriquecido con datos visuales

#### 4. `send-purchase-confirmation` ⭐ NUEVO
**Monitoreo implementado:**
- ✅ Configuración completa de Sentry con EdgeFunctionLogger
- ✅ Monitoreo de operaciones críticas:
  - Validación de entrada (order_id)
  - Consulta de datos de orden desde BD
  - Generación de template HTML de email
  - Envío vía Resend API
- ✅ Alertas críticas para fallos de email (tag: critical=true)
- ✅ Métricas de performance y duración
- ✅ Contexto enriquecido con datos de usuario y orden

**Tags específicos:**
- `order.id`: ID de la orden
- `user.email`: Email del usuario
- `order.items_count`: Número de items en la orden
- `operation`: send_purchase_confirmation_email
- `critical`: true (para fallos de email)

**Logs estructurados:**
- Inicio y fin de operación con duración
- Estados de validación y fetch de datos
- Éxito/fallo de envío de emails
- Manejo de errores de Resend API

#### 5. `generate-receipt-pdf` ⭐ NUEVO
**Monitoreo implementado:**
- ✅ Configuración completa de Sentry con EdgeFunctionLogger
- ✅ Monitoreo de operaciones críticas:
  - Validación de entrada (order_id)
  - Consulta de datos de orden desde BD
  - Generación de HTML de comprobante
  - Métricas de tamaño de output
- ✅ Tracking de performance de generación
- ✅ Contexto enriquecido con datos de orden

**Tags específicos:**
- `order.id`: ID de la orden
- `user.email`: Email del usuario
- `order.items_count`: Número de items
- `function`: generate-receipt-pdf
- `critical`: true (para errores inesperados)

**Logs estructurados:**
- Métricas de tamaño de HTML generado
- Duración de operaciones
- Estados de consulta de base de datos

**Tags específicos:**
- `story.id`: ID del cuento
- `cover.visual_style`: Estilo visual
- `cover.color_palette`: Paleta de colores
- `cover.has_reference_images`: Número de imágenes de referencia

### Nivel 2 - Implementación Básica

Las siguientes funciones tienen implementación básica de Sentry:
- `describe-and-sketch` (inicio de implementación)
- `analyze-character`
- `generate-illustration`
- `generate-image-pages`
- `generate-scene`
- `generate-spreads`
- `generate-variations`
- `generate-thumbnail-variant`
- `generate-cover-variant`
- `send-reset-email`
- `delete-test-stories`

## Contexto y Tags Estándar

### Tags Automáticos
```typescript
{
  'function.name': 'nombre-funcion',
  'function.runtime': 'deno',
  'function.platform': 'supabase'
}
```

### Contexto de Request
```typescript
{
  request: {
    method: 'POST',
    url: 'https://...', 
    headers: {...}
  },
  runtime: {
    deno: '1.x.x',
    v8: '12.x.x',
    typescript: '5.x.x'
  }
}
```

### Usuario
```typescript
{
  user: {
    id: 'uuid-del-usuario'
  }
}
```

## Beneficios Implementados

### 🔍 Visibilidad Total
- **Errores centralizados**: Todos los errores de Edge Functions reportados a Sentry
- **Contexto enriquecido**: Usuario, función, parámetros, timing
- **Stack traces completos**: Con mapeo a código fuente

### 📊 Performance Tracking
- **Timing de operaciones**: `withErrorCapture` mide duración automáticamente
- **Identificación de cuellos de botella**: En llamadas a APIs externas
- **Métricas por función**: Performance individual de cada Edge Function

### 🛠️ Debugging Avanzado
- **Breadcrumbs**: Seguimiento del flujo de ejecución paso a paso
- **Tags específicos**: Filtrado preciso por función, usuario, operación
- **Contexto completo**: Estado de la aplicación al momento del error

### 🚨 Alertas Proactivas
- **Errores críticos**: Notificación inmediata de fallos
- **Performance degradation**: Alertas por lentitud inusual
- **Rate limiting**: Detección de problemas con APIs externas

## 🗄️ Monitoreo de Triggers de Base de Datos

### Trigger: `send_purchase_confirmation_email()`

**Implementación de logging:**
- ✅ **Logging estructurado** con prefijo `[PURCHASE_CONFIRMATION_TRIGGER]`
- ✅ **Contexto enriquecido** con datos de orden (ID, user_id, monto, método pago)
- ✅ **Manejo robusto de errores** sin fallar el flujo principal
- ✅ **Monitoreo de HTTP calls** con status y respuesta
- ✅ **Timeout incrementado** a 10 segundos para estabilidad

**Tipos de logs generados:**
```sql
-- Log de inicio
RAISE LOG '[PURCHASE_CONFIRMATION_TRIGGER] Starting email notification for order %'

-- Log de éxito HTTP
RAISE LOG '[PURCHASE_CONFIRMATION_TRIGGER] HTTP call completed for order %'

-- Warning en fallo HTTP
RAISE WARNING '[PURCHASE_CONFIRMATION_TRIGGER] HTTP call failed for order % with status %'

-- Warning en excepción
RAISE WARNING '[PURCHASE_CONFIRMATION_TRIGGER] Failed to send email notification for order %'

-- Debug para skip
RAISE DEBUG '[PURCHASE_CONFIRMATION_TRIGGER] Skipping order % - status change from % to %'
```

**Información capturada:**
- **order_id**: ID de la orden procesada
- **http_status**: Status code de respuesta de edge function
- **error_code**: SQLSTATE en caso de error
- **error_message**: SQLERRM con detalles del error
- **trigger_context**: Contexto completo de la orden

**Configuración mejorada:**
- **Timeout**: 10 segundos (vs 5s original) para mayor estabilidad
- **Manejo de errores**: No falla el trigger principal si email falla
- **Status verification**: Verificación de códigos HTTP 2xx
- **Structured logging**: JSON context para mejor parsing

## Configuración de Alertas ⭐ ACTUALIZADO

### Alertas Críticas Post-Pago

**Fallos de Email de Confirmación:**
```javascript
// Errores críticos en envío de emails post-compra
tags.critical = 'true'
AND function.name = 'send-purchase-confirmation'
AND level = 'error'
```

**Triggers de BD Fallando:**
```sql
-- Monitoreo en logs de PostgreSQL
message CONTAINS '[PURCHASE_CONFIRMATION_TRIGGER]'
AND level IN ['WARNING', 'ERROR']
```

**Latencia Alta en Post-Pago:**
```javascript
// Edge functions de post-pago con más de 10s
elapsed > 10000
AND function.name IN ['send-purchase-confirmation', 'generate-receipt-pdf']
```

### Alertas Recomendadas (Previas)

**Errores Críticos:**
```javascript
// Cualquier error en funciones críticas
function.name IN ['generate-story', 'story-export', 'generate-cover', 'send-purchase-confirmation']
AND level = 'error'
```

**Performance:**
```javascript  
// Tiempo de respuesta mayor a 30 segundos
elapsed > 30000
AND function.name IN ['generate-story', 'story-export']
```

**Rate Limiting:**
```javascript
// Errores de API externa por rate limiting
error.message CONTAINS 'rate limit'
OR error.message CONTAINS '429'
```

**Volumen de Errores:**
```javascript
// Más de 10 errores en 5 minutos en cualquier función
COUNT(*) > 10 IN 5m
```

## Testing y Validación

### Testing Local
```bash
# 1. Iniciar Supabase local
npm run supabase:start

# 2. Verificar variables de entorno
echo $SENTRY_DSN

# 3. Probar función con error intencional
curl -X POST http://127.0.0.1:54321/functions/v1/generate-story \
  -H "Content-Type: application/json" \
  -d '{"invalid": "data"}'
```

### Validación en Sentry
1. **Dashboard de Sentry**: Verificar que aparezcan eventos
2. **Filtros por función**: `function.name:generate-story`
3. **Contexto completo**: Verificar tags, usuario, breadcrumbs
4. **Performance**: Revisar timing de operaciones

## Próximos Pasos

### Implementación Completa Pendiente
1. **Completar funciones básicas**: Agregar `withErrorCapture` y breadcrumbs detallados
2. **Script automatizado**: Finalizar script de aplicación masiva
3. **Testing sistemático**: Probar cada función con casos de error

### Monitoreo Avanzado
1. **Custom metrics**: Métricas específicas de negocio (cuentos generados, PDFs exitosos)
2. **Correlación de errores**: Vincular errores relacionados entre funciones
3. **Dashboard personalizado**: Vista unificada del estado del sistema
4. **Alertas inteligentes**: Machine learning para detección de anomalías

### Optimización
1. **Performance monitoring**: Identificar y optimizar funciones lentas
2. **Error patterns**: Análisis de patrones para prevención proactiva
3. **Capacity planning**: Métricas para escalado automático

## Estructura de Archivos

```
supabase/functions/
├── _shared/
│   └── sentry.ts                    # ✅ Utilidad central de Sentry
├── generate-story/
│   └── index.ts                     # ✅ Implementación completa
├── story-export/
│   └── index.ts                     # ✅ Implementación completa  
├── generate-cover/
│   └── index.ts                     # ✅ Implementación completa
├── describe-and-sketch/
│   └── index.ts                     # 🟡 Implementación básica
└── [otras funciones]/
    └── index.ts                     # 🔄 Pendiente implementación básica

docs/tech/
└── sentry-edge-functions-monitoring.md  # 📚 Esta documentación

scripts/
└── add-sentry-to-functions.ts       # 🛠️ Script de automatización
```

## Conclusión

El sistema de monitoreo con Sentry está **funcionalmente completo** para las funciones críticas del negocio. Proporciona:

- ✅ **Visibilidad total** de errores en tiempo real
- ✅ **Contexto enriquecido** para debugging efectivo  
- ✅ **Performance tracking** automático
- ✅ **Alertas proactivas** (por configurar)
- ✅ **Escalabilidad** para el resto de funciones

La implementación seguirá el patrón establecido para completar la cobertura del 100% de Edge Functions.