AGENTE EXPERTO MULTIDISCIPLINARIO — REGLAS BASE
[Pegar íntegro el bloque de reglas base de siempre: ROL, PRINCIPIOS, DIAGRAMA, INNOVACIÓN, PROTOCOLO DE CIERRE 85%, PROHIBIDO]

PROYECTO: La Finca App 2026 — Restaurante La Finca, Durango. Eduardo = owner/líder técnico, nivel básico: toda instrucción con app/ventana, ruta y comando exactos, un paso a la vez, sin asumir conocimiento. DEADLINE: 2 semanas (≈21-jul-2026).

EQUIPO: Eduardo (Eduardogs2236-V) desktop canónico + laptop-E (usuario Windows C:\Users\1). Iván (SkeloEsDios) laptop, collaborator, solo código, jamás datos.

ARQUITECTURA: lafinca_app_v5.html (monolito estable) + lafinca_bento_v1.html (activo) · Node/Express backend/server.js:3000 con dotenv OK (.env jamás en historial, bloqueo 3.5 CERRADO) · PostgreSQL 18 base lafinca · repo pilotaje-la-finca en C:\dev\lafinca-frontend · repo markdown-consultoria en C:\dev\markdown-consultoria (Drive = solo .sql, CERO repos).

ESTADO CANÓNICO: HEAD main = 8379067 (PARCHE_14+15+16 incluidos). Backup vigente v7 (2026-07-04). Cifras v7: nomina_detalle 1238 · arqueo 7200 · empleados_nomina 126 · valija 590 · ventas_diarias 180 · pedidos_semanales 26. Tras parches en desktop: empleados_nomina quedará BAJA 77 · ACTIVO 48 · INCAPACIDAD 1; se genera backup v8.

REGLAS OPERATIVAS R1–R8 (vigentes, emitidas por errores reales):
R1 un comando por vez, leer respuesta, pegar resultado. R2 verificar carpeta en prompt antes de git. R3 pgAdmin solo tabs genéricos, jamás query en tab de .sql, jamás Ctrl+S con asterisco. R4 laptop = SELECT libre + parches solo como prueba declarada; desktop = única ejecución oficial vía psql -f. R5 rama antes de editar. R6 criterio de éxito = git pull TRAE el cambio, no "ejecuté comandos". R7 GitHub sin traductor automático. R8 PowerShell para todo; navegador solo inevitable con paso a paso sin asumir nada. Flujo dual: Eduardo mergea local (git merge --no-ff + push); Iván siempre PR.
Método parches: git checkout -b feature/x → New-Item PARCHE_NN.sql → code → pegar → add/commit/push → merge local → borrar ramas. Numeración: siguiente libre = 17. Parches viven en RAÍZ del repo.

CHECKLIST POR GRUPOS:
GRUPO B (datos, desktop) — PREPARADO 100%, EJECUCIÓN PENDIENTE: en desktop: git pull → $env:PGCLIENTENCODING="UTF8" → psql.exe (ruta completa C:\Program Files\PostgreSQL\18\bin\) -U postgres -d lafinca -f para PARCHE_14, 15, 16 en orden → pg_dump backup v8 → Drive → WhatsApp. Pendientes menores: puesto de Elvia (null, id 126) · forma_pago/dias_credito de PA002,010,011,014,015,017,021,024,028,034 · duplicado Avila: verificar si PARCHE_12/13 ya lo resolvió.
GRUPO 0 (Iván): Fase 5 varada — rama feature/prueba-onboarding pusheada SIN PR; Iván debe abrir PR (botón Compare & pull request) y Eduardo mergear. Luego: Fase 1.3 PostgreSQL 18 en su laptop + restaurar v7/v8 + documentar creación de backend\.env local.
GRUPO A (Iván tras Grupo 0): integrar módulos v5 → bento, una rama por módulo. CRÍTICO: frontend debe filtrar por ACTIVO/BAJA/INCAPACIDAD (PERMANENTE deja de existir tras PARCHE_14) — revisar v5 y bento. Validación toggle Bajas 4 puntos. 🔴 scroll bento: recomendación comprimir columna izquierda.
GRUPO C: GitHub CLI (winget install GitHub.cli) para PRs por terminal · PATH PostgreSQL desktop · arranque.ps1 · depurar backups v4–v6 Drive · auditoría Drive Mi PC en DESKTOP (laptop-E ya aprobada) · CHECKLIST.md al repo · renombrar G:\...\MARKDOWN a MARKDOWN_CORRUPTO_NO_USAR.
GRUPO D (Eduardo, nuevo frente): UX por módulo (flujos, jerarquía, wireframes) que alimenta ramas de Iván. Incluir: marcadores del apartado Bajas (finiquito, renuncia) + INCAPACIDAD.

PUNTOS ABIERTOS: cifra 54 sin origen (probable filtro frontend) · tipo_contrato (columna nueva PARCHE_14) conservar o dropear a futuro · carpeta parches/ a futuro · VS Code Restricted Mode (dar Trust a C:\dev) · encoding UTF-8 roto en comentarios de server.js/db.js (cosmético).

MÓDULO ACTIVO AL MIGRAR: sesión laptop-E lista para cierre físico (re-verificar git status ambos repos al retomar). PRÓXIMA ACCIÓN CRÍTICA con deadline 2 semanas: (1) sesión DESKTOP: pull 8379067 + ejecutar parches + backup v8, (2) destrabar PR de Iván para arrancar Grupo A en paralelo, (3) Eduardo arranca Grupo D del primer módulo. Prioridad estratégica sugerida para las 2 semanas: backend conectado al bento (salir de modo simulado) es la ruta crítica — todo lo demás la alimenta.