# AGENTS.md — Contexto y Arquitectura del Proyecto (`todo-web`)

## 1. Stack Tecnológico y Versiones
- **Framework**: Angular `^22.2.0` (`@angular/core`, `@angular/common`, `@angular/forms`, `@angular/platform-browser`, `@angular/router`) con `@angular/cli` y `@angular/build` `^22.2.7`.
- **Arquitectura Angular**: Componentes **Standalone** por defecto (sin sufijo `.component`), **Signals** (`signal()`) y modo **Zoneless**.
- **Gestor de Paquetes**: `pnpm@12.21.0`.
- **UI y Estilos**:
  - **Tailwind CSS v4** (`tailwindcss` `^4.1.12`, `@tailwindcss/postcss` `^4.1.12`, `postcss` `^8.5.3`).
  - Configurado mediante `.postcssrc.json` e importado globalmente con `@import 'tailwindcss';` en `src/styles.css`.
- **Calidad y Testing**:
  - **Prettier** `^3.8.1` (`printWidth: 100`, `singleQuote: true`, parser `angular` para `.html`).
  - **Vitest** `^5.0.0` + `jsdom` `^30.0.0` (`@angular/build:unit-test`).
  - **TypeScript** `~6.0.2` (modo estricto activado).

## 2. Arquitectura de Carpetas y Regla de Componentes
- **Regla de Ubicación de Componentes**:
  - **Componentes compartidos (`src/app/shared/components/`)**: Si un componente se utiliza en **más de una página** (ej. `ui-button`, `ui-input`, `ui-card`, `ui-checkbox`, `ui-badge`, `ui-alert`, `ui-modal`, `ui-empty-state`, `ui-navbar`, `ui-brand-logo`), debe ubicarse en `src/app/shared/components/` y exportarse en `src/app/shared/components/index.ts`.
  - **Componentes exclusivos de módulo/página (`src/app/module/<modulo>/components/`)**: Si un componente solo se necesita para **esa página en particular** (ej. `login-hero`, `login-header`, `login-form`), se ubica dentro de `src/app/module/<modulo>/components/`.
  - **Páginas (`src/app/module/<modulo>/page/`)**: Las páginas se construyen ensamblando componentes de su módulo y componentes compartidos para facilitar el mantenimiento.

```text
todo-web/
├── public/                              # Assets estáticos públicos
└── src/
    ├── index.html                       # Documento HTML base (<app-root>)
    ├── main.ts                          # Bootstrap de la aplicación con App y appConfig
    ├── styles.css                       # Estilos globales y directiva @import 'tailwindcss';
    └── app/
        ├── app.ts / app.html / app.css  # Componente raíz standalone
        ├── app.config.ts                # Proveedores globales
        ├── app.routes.ts                # Definición de rutas
        ├── shared/
        │   └── components/              # Componentes reutilizables en 2+ páginas (Design System)
        └── module/
            └── <modulo>/
                ├── components/          # Componentes exclusivos de la página/módulo
                └── page/                # Vista contenedora que ensambla los componentes
```

## 3. Reglas de Ahorro de Tokens y Contexto
- **Evitar lecturas redundantes**: Con este resumen del stack, no leas `package.json`, `angular.json`, `tsconfig*.json`, `.prettierrc` ni `pnpm-lock.yaml` salvo solicitud explícita.
- **Ignorar directorios generados**: Prohibido leer o buscar dentro de `node_modules/`, `.angular/`, `dist/` o `pnpm-lock.yaml`.
- **Reglas modulares activas**:
  - `.agents/rules/ui-ux-designer.md` (`always_on`): Rol UI/UX, planificación obligatoria (**Qué**, **Cómo**, **Dónde**) con freno de aprobación y proactividad.
  - `.agents/rules/angular-logic-lock.md` (`glob: **/*.ts, **/*.html`): Bloqueo de edición de archivos `.ts` y protección de bindings en `.html`.
