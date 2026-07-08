AGENTE EXPERTO MULTIDISCIPLINARIO — REGLAS BASE
[Pegar íntegro el bloque de reglas base de siempre]

PROYECTO: La Finca App 2026. Eduardo owner nivel básico (app/ruta/comando exactos, un
paso a la vez). DEADLINE ≈21-jul-2026. Reglas R1–R8 vigentes. Parches: siguiente = 17.

ESTADO CANÓNICO (07-jul, cierre desktop):
- HEAD main = caea29c (FLUJOS.md v1 + PARCHE_16 v2 + commit onboarding Iván)
- BD desktop: parches 14/15/16 APLICADOS. Conteos: nomina_detalle 1238 · arqueo 7200 ·
  empleados_nomina 126 (BAJA 77/ACTIVO 48/INCAPACIDAD 1) · valija 590 · ventas 180 ·
  pedidos_semanales 26. Tablas empleados/resumen_mensual/solicitudes_efectivo eliminadas.
- Backup vigente: backup_lafinca_2026-07-07_v8_desktop.sql en Drive
  G:\Mi unidad\CONSULTORIA\BACKUPS_LAFINCA (compartida a Iván como Lector).
  v7 NO localizado en Drive desktop — verificar en laptop y archivar; v1–v6 depurables.
- Iván: Contributor (PR #4 mergeado tras reabrirlo — él lo cerró por accidente; regla
  nueva: Iván no cierra sus PRs). Tiene tareas T1–T6 en su propio chat "IVAN —
  Onboarding La Finca": sync repo, PostgreSQL 18, restaurar v8, .env local, prueba de
  humo, STOP hasta asignación. Espera evidencia (captura bento con datos) por WhatsApp.
- Drive desktop auditado ✅ (solo Downloads/Documents). VS Code desktop: Restricted
  Mode PENDIENTE (Manage→Trust).

PARCHE_17 (expedientes) — INSUMOS:
✅ 44 expedientes INE validados (tabla completa en PROMPT_MIGRACION_2026-07-07_INE.md,
   mismo repo markdown — leerla al construir el parche)
✅ Cruce vs 49 activos hecho. Resultado:
   - 3 BAJAS NUEVAS a aplicar: id 124 Carrera Martinez Issis Aide, id 29 Duran Mercado
     Blanca Estela, id 61 Martinez Carrillo Jesus Alexis → conteo esperado post-parche:
     ACTIVO 45 · BAJA 80 · INCAPACIDAD 1
   - Sin INE, se quedan como están: id 126 Garcia Montañez Elvia (INCAPACIDAD),
     id 69 Monrreal Aldaba Josefina (ACTIVO, INE pendiente)
   - Domicilio pendiente: Ramírez Ceniceros (id 89)
✅ 20 CORRECCIONES DE NOMBRE (INE manda): id2 Magali · id5 Anguiano Najera Marcos Omar ·
   id123 Avila Villarreal Jesus Jafet · id13 Bobadilla Calleros Alicia · id15 Cabral
   Miriam Janette · id16 Cabrales Parra Juan Jose · id27 Duarte Sornia Brayan Guadalupe ·
   id35 Flores Amador Fernando Antonio · id41 Gaytan Ortiz Irving Jezreel · id45
   Gonzalez Salazar Edgar Ivan · id50 Almonte Hernandez Yamile Sujei · id64 Valadez
   Martinez Maria Gabriela · id68 Manjarrez Ramirez David Ismael · id72 Nuñez Cabrales
   Joshua Hibrain · id73 Nuñez Delgado Edmi Denisse · id103 Gallegos Rodriguez Anyaneth
   Samantha · id112 Solis Jimenez Abraham · id114 Sosa Macias Aylen Paola · id121
   Zamarripa Trejo Brenda Jacqueline · id125 Rojas Trejo Jenifer Guadalupe
🔴 DECISIONES ABIERTAS (resolver ANTES de construir el parche):
   (a/b) columnas en empleados_nomina VS tabla nueva expedientes_personal
   (empleado_id FK, curp, fecha_nacimiento, sexo, calle, colonia, cp, municipio,
   estado_dom) — RECOMENDADA (b)
   (canal) el parche lleva CURPs/domicilios: ¿Drive (recomendado) o repo?

⏳ PENDIENTE GENERAL: evidencia T5 de Iván → asignarle primer módulo con FLUJOS.md ·
Grupo D: siguientes flujos (IMSS/Infonavit/Nómina) + catálogo puestos/áreas · Grupo C:
GitHub CLI, arranque.ps1, depurar v1–v6, CHECKLIST.md, renombrar MARKDOWN corrupto ·
verificar privacidad repo markdown-consultoria (contiene CURPs: debe ser privado sin
colaboradores)

⚠️ PUNTOS ABIERTOS: puesto vacío 126/126 (catálogo pendiente) · cifra 54 ·
tipo_contrato · carpeta parches/ · encoding server.js/db.js · duplicado Avila
(INE confirma persona única id 123; verificar si queda rastro duplicado) ·
bloqueo puntual .git en merge de hoy (Drive descartado; si se repite, investigar
antivirus/indexador)

PRÓXIMA ACCIÓN CRÍTICA: (1) resolver a/b + canal → construir y ejecutar PARCHE_17 +
backup v9, (2) recibir evidencia de Iván → arrancar Grupo A con FLUJOS.md, (3) ruta
crítica: backend conectado al bento.        