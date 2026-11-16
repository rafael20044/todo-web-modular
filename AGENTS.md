# AGENTS.md — Contexto, Arquitectura y Contrato API (`todo-web`)

## 1. Stack Tecnológico y Versiones
- **Framework**: Angular `^22.2.0` (`@angular/core`, `@angular/common`, `@angular/forms`, `@angular/platform-browser`, `@angular/router`) con `@angular/cli` y `@angular/build` `^22.2.7`.
- **Arquitectura Angular**: Componentes **Standalone** por defecto (sin sufijo `.component`), **Signals** (`signal()`), `inject()` y modo **Zoneless**.
- **Gestor de Paquetes**: `pnpm@12.21.0`.
- **UI y Estilos**: Tailwind CSS v4 (`^4.1.12`) vía `.postcssrc.json` y `@import 'tailwindcss';` en `src/styles.css`.
- **Calidad y Testing**: Prettier `^3.8.1` (`printWidth: 100`, `singleQuote: true`), Vitest `^5.0.0` + `jsdom` `^30.0.0`, TypeScript `~6.0.2` estricto.

## 2. Arquitectura de Carpetas, Componentes y Servicios
- **Componentes compartidos (`src/app/shared/components/`)**: Si un componente se usa en **2 o más páginas** (`ui-alert`, `ui-badge`, `ui-brand-logo`, `ui-button`, `ui-card`, `ui-checkbox`, `ui-color-picker`, `ui-empty-state`, `ui-input`, `ui-modal`, `ui-navbar`, `ui-pagination`, `ui-select`, `ui-textarea`), va en `src/app/shared/components/` y se exporta en `src/app/shared/components/index.ts`.
- **Componentes exclusivos de módulo/página (`src/app/module/<modulo>/components/`)**: Si un componente solo se necesita en **esa página** (ej. `login-hero`, `login-header`, `login-form`), va en `src/app/module/<modulo>/components/`.
- **Páginas (`src/app/module/<modulo>/page/`)**: Ensamblan los componentes del módulo y los compartidos.
- **Modelos/Interfaces (`src/app/shared/model/`)**: Agrupados por dominio (ej. `src/app/shared/model/user/IUserLogin.ts`).
- **Servicios (`src/app/shared/services/`)**:
  - Todos los servicios se ubican en `src/app/shared/services/`, **cada servicio en su propia carpeta** y usando la sintaxis de Angular 22 (`inject()`, `signal()`, sin sufijo `.service.ts` clásico si usa nomenclatura Angular 22 como `auth-service.ts`).
  - **Regla de Esqueleto (Sin Lógica)**: Al crear un servicio por solicitud del usuario, solo se definen sus variables/inyecciones y las firmas de sus métodos retornando siempre `return null;`. El usuario implementa la lógica.

## 3. Contrato de la API Backend (`http://localhost:8080/api`)
- **Autenticación y Seguridad**:
  - `POST /api/auth/login` (Pública): Body `{ email, password }` -> Retorna `200 OK` `{ accessToken }` + Cookie `HttpOnly` `token` (Refresh Token 7 días).
  - `POST /api/auth/refresh` (Pública, requiere cookie `token`) -> Rota cookie y retorna `{ accessToken }`.
  - `POST /api/auth/logout` (Pública, requiere cookie `token`) -> `204 No Content`.
  - `DELETE /api/auth/logout/{userId}` (`Bearer`) -> Cierra todas las sesiones del usuario (`204`).
  - `GET /api/auth/tokens?userId=&isRevoked=&page=0&size=10` (`Bearer`) -> `Page<ResponseRefreshTokenDto>` (`{ id, userId, expiresAt, isRevoked, createdAt }`).
- **Usuarios (`/api/users`)**:
  - `POST /api/users` (Pública): `{ username, email, password, role?: 'ROLE_USER' | 'ROLE_ADMIN' }` -> `201` `{ id, username, email, role, createdAt, updatedAt }`.
  - `GET /api/users`, `GET /api/users/{uuid}`, `PUT /api/users/{uuid}` (`{ username?, password?, role? }`), `DELETE /api/users/{uuid}` (`Bearer`).
- **Categorías (`/api/categories`, `Bearer`)**:
  - `POST /api/categories`: `{ userId, name, color?: '#3B82F6' }` -> `201` `{ id, userId, name, color, createdAt }`.
  - `GET /api/categories?userId=&page=0&size=20`, `GET /api/categories/{id}`, `PUT /api/categories/{id}` (`{ name, color }`), `DELETE /api/categories/{id}`.
- **Tareas (`/api/tasks`, `Bearer`)**:
  - `POST /api/tasks`: `{ userId, categoryId?, title, description?, priority?: 'LOW'|'MEDIUM'|'HIGH'|'URGENT', dueDate? }` -> Inicia en `status: 'PENDING'`.
  - `GET /api/tasks?userId=&categoryId=&status=&page=0&size=20` -> `Page<ResponseTaskDto>`.
  - `PUT /api/tasks/{id}`: `{ categoryId?, title, description?, status: 'PENDING'|'IN_PROGRESS'|'COMPLETED'|'CANCELLED', priority, dueDate? }`.
  - `DELETE /api/tasks/{id}` -> `204`.
- **Subtareas (`/api/subtasks`, `Bearer`)**:
  - `POST /api/subtasks`: `{ taskId, title, position?: 0 }` -> `201` `{ id, taskId, title, isCompleted, position, createdAt, updatedAt }`.
  - `GET /api/subtasks?taskId=&page=0&size=20`, `PUT /api/subtasks/{id}` (`{ title, isCompleted, position }`), `DELETE /api/subtasks/{id}`.
- **Constantes de Validación (`MyConst`) y Errores (`ErrorDto`)**:
  - `email`: máx `255`, regex email. `username`: `2` a `100` chars. `password`: mín `8` chars.
  - `category.name`: `2` a `50` chars (único por usuario). `category.color`: Hex `^#[A-Fa-f0-9]{6}$` (default `#3B82F6`).
  - `task.title`: `2` a `150` chars. `task.description`: máx `2000` chars. `subtask.title`: `2` a `200` chars, `position >= 0`.
  - Formato de error estándar: `{ code: string, message: string, status: number }`.
  - Formato paginado: `{ content: T[], pageable: { pageNumber, pageSize }, totalElements, totalPages, first, last, empty }`.

## 4. Reglas de Ahorro de Tokens y Contexto
- **Evitar lecturas redundantes**: No leer `package.json`, `angular.json`, `tsconfig*.json`, `.prettierrc` ni `pnpm-lock.yaml` salvo solicitud explícita.
- **Ignorar directorios generados**: Prohibido leer o buscar en `node_modules/`, `.angular/`, `dist/` o `pnpm-lock.yaml`.
- **Reglas modulares activas**:
  - `.agents/rules/ui-ux-designer.md` (`always_on`): Rol UI/UX, planificación obligatoria (**Qué**, **Cómo**, **Dónde**) con freno de aprobación y proactividad.
  - `.agents/rules/angular-logic-lock.md` (`glob: **/*.ts, **/*.html`): Bloqueo de edición de archivos `.ts`, esqueleto de servicios en `src/app/shared/services/` y protección de bindings en `.html`.
