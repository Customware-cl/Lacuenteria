# 📚 La CuenterIA

Plataforma web interactiva para crear cuentos infantiles personalizados con ilustraciones generadas mediante inteligencia artificial.

## 📋 Índice

- [🌟 Características](#-características)
- [🚀 Tecnologías](#-tecnologías)
- [🛠️ Instalación](#-instalación)
- [📝 Uso](#-uso)
- [📖 Estructura del Proyecto](#-estructura-del-proyecto)
- [🛠️ Componentes Principales](#-componentes-principales)
- [📊 Flujo de Usuario](#-flujo-de-usuario)
- [🔧 Contextos](#-contextos)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)
- [✨ Créditos](#-créditos)

## 🌟 Características

- **Creación de Personajes**
  - Soporte hasta 3 personajes por cuento
  - Generación de variantes visuales mediante IA
  - Personalización detallada de cada personaje

- **Diseño de Historias**
  - Selección de edad objetivo
  - Múltiples estilos literarios
  - Mensajes centrales personalizables
  - 6-10 páginas por cuento + portada

- **Personalización Visual**
  - Estilos visuales predefinidos
  - Paletas de colores adaptables
  - Formato profesional (20cm x 20cm)

- **Vista Previa Interactiva**
  - Visualización tipo libro
  - Edición de prompts por página
  - Regeneración de imágenes en tiempo real
  - Exportación a PDF

## 🚀 Tecnologías

- **Frontend**
  - React 18 + TypeScript
  - Vite como bundler
  - Tailwind CSS para estilos
  - Lucide Icons para iconografía
  - React Router DOM para navegación

- **Backend**
  - Supabase para autenticación y base de datos
  - API de IA para generación de imágenes

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
VITE_SUPABASE_URL=tu-url-de-supabase
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 📝 Uso

1. Inicia sesión con las credenciales de prueba:
   - Email: demo@lacuenteria.com
   - Contraseña: demo123

2. Sigue el asistente paso a paso:
   - Crea y personaliza los personajes
   - Define la historia y el estilo
   - Ajusta el diseño visual
   - Previsualiza y descarga tu cuento

## 📖 Estructura del Proyecto

```
src/
├── components/         # Componentes React
│   ├── Auth/          # Componentes de autenticación
│   ├── Character/     # Componentes de personajes
│   ├── Layout/        # Componentes de estructura
│   └── Wizard/        # Asistente paso a paso
├── context/           # Contextos de React
├── pages/             # Páginas principales
├── types/             # Definiciones TypeScript
└── main.tsx          # Punto de entrada
```

## 🛠️ Componentes Principales

### Componentes de Personajes
- `CharactersGrid`: Muestra y gestiona la lista de personajes
- `CharacterForm`: Formulario para crear y editar personajes
- `CharacterCard`: Tarjeta individual de personaje

### Componentes de Layout
- `Header`: Barra de navegación superior
- `Sidebar`: Menú lateral de navegación

## 📊 Flujo de Usuario

1. **Autenticación**
   - Inicio de sesión
   - Registro
   - Gestión de sesión

2. **Creación de Personajes**
   - Seleccionar número de personajes
   - Definir características
   - Generar y personalizar imágenes

3. **Diseño de Historia**
   - Definir tema y estilo
   - Estructurar el cuento
   - Personalizar mensajes

4. **Visualización y Exportación**
   - Previsualización tipo libro
   - Ajustes finales
   - Exportación a PDF

## 🔧 Contextos

- `AuthContext`: Manejo de autenticación
- `WizardContext`: Estado y control del asistente

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

## 📄 Licencia

[MIT](LICENSE)

## ✨ Créditos

Desarrollado con ❤️ por el equipo de Customware