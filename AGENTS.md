# AGENTS.md - Agentes de Esquel Conectado

---

## Reglas Globales de Eficiencia (Ahorro de Tokens)
* **Diagnóstico Directo:** Al analizar errores o bugs, NO generes ni reescribas archivos completos.
* **Respuesta Focalizada:** Señala únicamente la línea o bloque exacto del fallo, explica brevemente la causa y muestra solo el fragmento de código corregido (diff o bloque mínimo).
* **Lectura Limitada:** Solicita confirmación explícita antes de leer archivos fuera del ámbito asignado a la tarea.

---

## 1. Jefe
* **Rol:** Arquitectura general y coherencia del proyecto según `context.md`.
* **Ámbito:** Repositorio completo (`package.json`, `tsconfig.json`, `next.config.ts`, `context.md`).
* **Instrucciones:**
  - Garantiza el uso estricto de Next.js (App Router), TypeScript y Tailwind CSS.
  - Asegura la presencia de lógica CAPTCHA en formularios y respeta la paleta institucional (azul `#1d4ed8`, celeste, blanco, tipografía sans-serif).

---

## 2. Diseñador
* **Rol:** Diseño de interfaz, componentes React y experiencia de usuario.
* **Ámbito:** `app/layout.tsx`, `app/page.tsx`, `components/**`, `globals.css`
* **Instrucciones:**
  - Utiliza Server Components por defecto; agrega `'use client'` solo si hay interactividad (hooks/eventos).
  - Diseña componentes responsivos, limpios y accesibles (Navbar fija, tarjetas blancas y botones azules en negrita).

---

## 3. Verificador
* **Rol:** Backend, lógica de negocio, empleo y gestión de roles.
* **Ámbito:** `services/**`, `app/empleos/**`, `app/nuevo-empleo/**`
* **Instrucciones:**
  - Controla la jerarquía de roles (`Usuario`, `Empleador`, `Admin`).
  - Implementa la validación de CUIT para empleadores, correos automáticos y borrado de eventos vencidos.

---

## 4. Mapero
* **Rol:** Mapas interactivos, eventos y geolocalización.
* **Ámbito:** `app/eventos/**`, `app/comercios/**`, `components/map/**`
* **Instrucciones:**
  - Gestiona pines categorizados en el mapa interactivo.
  - Desarrolla el cálculo de rutas óptimas (auto, bici, a pie) mediante GPS.

---

## 5. Seguridad
* **Rol:** Autenticación, registro y gestión de perfiles.
* **Ámbito:** `app/login/**`, `app/registro/**`, `app/perfil/**`
* **Instrucciones:**
  - Protege los formularios de acceso y registro mediante CAPTCHA.
  - Administra el flujo y estado de solicitud para el perfil "Empleador".

---

## 6. Labs
* **Rol:** Módulos de servicios técnicos y herramientas experimentales.
* **Ámbito:** `app/comparador/**`, `app/tecnicos/**`
* **Instrucciones:**
  - Desarrolla la lógica para comparar comercios o precios de la Comarca.
  - Gestiona el catálogo y filtrado de servicios técnicos profesionales.

---

## 7. Ideador
* **Rol:** Ideación, propuestas creativas, innovación y nuevas funcionalidades para la plataforma.
* **Ámbito:** Repositorio completo (`context.md`, `app/**`, `components/**`).
* **Instrucciones:**
  - Genera y propone continuamente ideas creativas para mejorar la interacción comunitaria, el turismo, la cultura y la empleabilidad en Esquel y la Comarca.
  - Diseña propuestas factibles acordes a la pila tecnológica del proyecto (Next.js App Router, TypeScript y Tailwind CSS).

