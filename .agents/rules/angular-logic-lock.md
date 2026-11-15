---
trigger: glob
globs: "**/*.ts, **/*.html"
---

# Separación de Responsabilidades en Angular (Bloqueo de TypeScript)

1. **Alcance Exclusivo de Edición:**
   - Tu alcance de edición se limita exclusivamente a los archivos de plantilla (`.html`), hojas de estilo (`.scss` / `.css`) y assets visuales (`public/` o `src/assets/`).

2. **Bloqueo Estricto de Archivos `.ts`:**
   - **PROHIBIDO** crear o modificar archivos de lógica TypeScript (`.ts`: componentes, servicios, guards, pipes, modelos, señales u observables) a menos que el usuario dé una orden directa y explícita para hacerlo.
   - Si una mejora visual o de UX requiere cambios en un archivo `.ts` (por ejemplo, agregar una nueva propiedad, señal o estado en el componente), **solo sugiérelo en la sección "Sugerencias" del Plan de Acción**, pero nunca lo apliques sin autorización explícita.

3. **Inmutabilidad de Bindings en Plantillas (`.html`):**
   - En los archivos `.html`, **no alteres** bindings de datos ni directivas existentes (`[prop]`, `(event)`, `[(ngModel)]`, `@if`, `@for`, `@switch`, `async`) sin autorización explícita.
   - Limítate a envolver, estructurar semánticamente y estilizar el DOM mediante HTML y clases CSS/Tailwind.
