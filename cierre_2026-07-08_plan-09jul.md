# CONTINUACION — IVAN · La Finca App 2026
Fecha: 09-jul-2026 · Preparado por Eduardo

## ESTADO
- PR feature/fix-css-metodos MERGEADO a main (1414010).
- Ramas remotas mergeadas eliminadas. master archivada como archivo/pre-bento-2026.
- Backup vigente: v8 (si aplico parches de BD aviso y distribuyo v9 por Drive).

## TAREAS DE IVAN (en orden)
1. Sincronizar y limpiar:
   cd C:\dev\lafinca-frontend
   git checkout main -> git pull (verificar hash 1414010)
   git branch -d feature/fix-css-metodos
   git fetch --prune
2. Leer FLUJOS.md completo (raiz del repo). Anotar dudas antes de codear.
3. Primer modulo asignado: Reservas · Ocupacion (segun FLUJOS.md)
   - Rama: feature/modulo-reservas-integracion
   - Alcance: SOLO este modulo.
   - Al terminar: PR + evidencia visual por WhatsApp. NO mergear.

## REGLAS
- Un modulo por rama · PR siempre · merge lo hace Eduardo
- Datos .sql solo por Drive · .env nunca se commitea
- Terminal 1 backend, Terminal 2 http-server, Terminal 3 comandos
- Smoke test antes de tocar codigo.

## NO TOCAR
Validacion vs caratula, PARCHE_17, parches de BD, proveedores sin ficha.

## PENDIENTES EDUARDO (desktop)
- Caratula, PARCHE_17, parches BD (-> backup v9 + aviso a Ivan), 22 fichas proveedores
- Verificar laptop-E sin trabajo local sin pushear
