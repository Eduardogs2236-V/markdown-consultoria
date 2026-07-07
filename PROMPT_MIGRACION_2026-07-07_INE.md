AGENTE EXPERTO MULTIDISCIPLINARIO — REGLAS BASE
[Pegar íntegro el bloque de reglas base de siempre]

PROYECTO: La Finca App 2026. Eduardo owner/líder técnico nivel básico (instrucciones con
app/ruta/comando exactos, un paso a la vez). DEADLINE ≈21-jul-2026. Reglas R1–R8 vigentes.
HEAD main = f8a528c (incluye FLUJOS.md v1). Backup vigente v7. Numeración parches: sig. 17.

✅ COMPLETADO ESTA SESIÓN (laptop-E, 07-jul):
- FLUJOS.md v1 en main: reglas globales UX (divulgación progresiva, ←Regresar + menú
  lateral, IDs internos fijos + etiquetas renombrables, patrón Módulo→Submenú→Lista+
  Filtros→Tarjeta) + módulo Personal OPCIÓN B (4 submenús: Expedientes|IMSS|Infonavit|
  Nómina; activo/baja/incapacidad son FILTROS, no submenús)
- Tarjeta "Expediente" definida sobre columnas reales de empleados_nomina: id=No.
  empleado, nombre (ya viene Apellidos Nombres, split descartado), estado con badge,
  puesto/área "Sin asignar", tipo_pago, sueldo_base, salario_diario_imss, ingreso
  (primer_anio+primera_sem), fila condicional última semana si BAJA; botones Historial
  de nómina y Editar
- VS Code Trust C:\dev CERRADO · Traductor Chrome GitHub CERRADO
- EXTRACCIÓN INE 44/44 validada (visual+OCR+estructura CURP) — TABLA ABAJO

🔄 EN PROCESO: PARCHE_17 (expedientes personal) — bloqueado por 3 insumos:
1. SELECT activos para cruce de faltantes (44 INE vs ~49 esperados):
   psql -c "SELECT id, nombre FROM empleados_nomina WHERE estado IN
   ('ACTIVO','INCAPACIDAD','PERMANENTE') ORDER BY nombre;"
2. Decisión a/b: (a) columnas nuevas en empleados_nomina vs (b) tabla nueva
   expedientes_personal ligada por empleado_id — RECOMENDADA (b)
3. Decisión canal: PARCHE_17 lleva datos personales (CURP/domicilios); repo es
   accesible a Iván ("Iván jamás datos") → evaluar viajar por Drive, no GitHub

⏳ PENDIENTE: PR Iván (0 abiertos, mensaje WhatsApp enviado) · desktop: pull f8a528c +
PARCHE_14/15/16 + backup v8 · Grupo A · Grupo C · catálogo puestos/áreas (alimenta
PARCHE de puesto) · domicilio Ramírez Ceniceros (Eduardo lo pedirá)

⚠️ PUNTOS ABIERTOS: 🔴 puesto vacío 126/126 (era "solo Elvia"; requiere catálogo+parche)
· privacidad PARCHE_17 (arriba) · cifra 54 · tipo_contrato · carpeta parches/ · encoding
server.js/db.js · forma_pago 10 proveedores · duplicado Avila (INE #12 Ávila Villarreal
Jesús Jafet confirma persona única — verificar si PARCHE_12/13 ya limpió BD)

== EXPEDIENTES INE VALIDADOS (44) — Durango/Durango todos; edad al 07-jul-2026 ==
Formato: Apellidos Nombres | F.nac | Edad | Sexo | CURP | Domicilio
1. Orona Celaya Manuel | 21/10/2002 | 23 | H | OOCM021021HDGRLNA0 | C Julián Vera Flores 214, Col. Juan Lira Bracho, 34188
2. Flores Calderón Edgar Antonio | 20/10/1981 | 44 | H | FOCE811020HDGLLD05 | C Miguel Huitrón 115, Fracc. Providencia, 34178
3. Manjarrez Ramírez David Ismael | 04/08/2001 | 24 | H | MARD010804HDGNMVA2 | C 1ro de Mayo 219, Col. José Revueltas, 34219
4. Sosa Macías Aylen Paola | 23/06/2006 | 20 | M | SOMA060623MDGSCYA9 | C Enrique Carrola Antuna 1009, Col. Genaro Vázquez, 34169
5. Retana Monrreal María Esmeralda | 24/11/1995 | 30 | M | REME951124MDGTNS04 | C Cuitláhuac 200, Col. Azteca, 34190
6. Durán Cabrera David | 14/12/1984 | 41 | H | DUCD841214HDGRBV05 | C Toma de Durango 206, Col. Juan de la Barrera, 34150
7. Soto Lares Jorge | 12/10/1991 | 34 | H | SOLJ911012HCHTRR05 | C Alcatraz 205, Col. Ampl. PRI, 34017 (nac. Chihuahua)
8. Almonte Hernández Belem Magali | 30/03/2004 | 22 | M | AOHB040330MDGLRLA0 | Prol. Hidalgo 856-3, Col. Guadalupe, 34020 — CORREGIR BD: "Magaly"→"Magali"
9. Almonte Hernández Yamile Sujei | 10/12/1996 | 29 | M | AOHY961210MDGLRM04 | C Providencia 134, Col. Santa María, 34050
10. Solís Jiménez Abraham | 14/02/2003 | 23 | H | SOJA030214HDGLMBA3 | C Lirio 121, Fracc. Jardines de Durango, 34200
11. Ramírez Ceniceros Saúl Alejandro | 08/07/2005 | 20 | H | RACS050708HDGMNLA7 | PENDIENTE domicilio (solo constancia CURP)
12. Ávila Villarreal Jesús Jafet | 29/12/1999 | 26 | H | AIVJ991229HDGVLS05 | C Agustín de Iturbide 305, Col. Independencia, 34166
13. Gallegos Rodríguez Anyaneth Samantha | 18/03/2003 | 23 | M | GARA030318MDGLDNA1 | C Paseo del Tulipán 110, Fracc. Valle del Paseo, 34224
14. Mejía Pérez Oswaldo Manuel | 05/06/1997 | 29 | H | MEPO970605HDGJRS00 | C Osa Menor 115, Fracc. Villas del Guadiana I, 34224
15. Martínez Velázquez José Eduardo | 06/07/1989 | 37 | H | MAVE890706HDGRLD06 | C Osa Menor 115, Fracc. Villas del Guadiana I, 34208
16. Cabrales Parra Juan José | 27/11/1995 | 30 | H | CAPJ951127HDGBRN07 | C Manzanos 304, Col. Ciprés de la Tinaja, 34217
17. Cruztitla Salazar Joselyne | 18/09/2001 | 24 | M | CUSJ010918MDGRLSA0 | C Mecánicos 308, Fracc. Fidel Velázquez I, 34229
18. Ceniceros Durán Blanca Michelle | 16/12/1999 | 26 | M | CEDB991216MDGNRL09 | C Luis Donaldo Colosio 207, Col. El Ciprés Cerro del Mercado, 34030
19. Núñez Delgado Edmi Denisse | 20/04/2005 | 21 | M | NUDE050420MDGXLDA6 | C Quebradas 91, Fracc. Villas del Guadiana VII, 34228
20. Ortiz Soto María Elena | 05/02/1975 | 51 | M | OISE750205MDGRTL04 | C 3 de Agosto 416, Col. Tierra y Libertad, 34127
21. Rojas Trejo Jenifer Guadalupe | 20/07/2005 | 20 | M | ROTJ050720MDGJRNA5 | C Revolución Mexicana 304-B, Col. Benigno Montoya, 34196
22. Estrada Vidales Jesús Iván | 17/06/1978 | 48 | H | EAVJ780617HDGSDS03 | C Murallas 103, Col. Santa María, 34050
23. Amador Santillán Enedina | 04/12/1980 | 45 | M | AASE801204MDGMNN00 | C Tepehuanes 307, Col. Olga Margarita, 34270
24. Bretado Bretado Víctor | 23/12/1979 | 46 | H | BEBV791223HDGRRC27 | C Ilinio 506, Col. Luis Echeverría, 34250
25. Romero Morales Erik Alejandro | 24/02/2003 | 23 | H | ROME030224HDGMRRA3 | C Conductores 107-A, Col. Benjamín Méndez, 34020
26. Arámbula Cabral Manuel de Jesús | 01/12/1986 | 39 | H | AACM861201HDGRBN09 | C José Revueltas 534, Col. Genaro Vázquez, 34169
27. Duarte Sornia Brayan Guadalupe | 31/12/2001 | 24 | H | DUSB011231HDGRRRA5 | C Miguel Barraza 203, Col. Asentamientos Humanos, 34145
28. Flores Amador Fernando Antonio | 14/08/2006 | 19 | H | FOAF060814HDGLMRA8 | Priv. Sergio González Santa Cruz 104, Col. Legisladores Duranguenses, 34046
29. Valadez Martínez María Gabriela | 20/06/1981 | 45 | M | VAMG810620MDGLRB08 | C Julián Vera Flores 318, Col. Lucio Cabañas, 34140
30. Zamarripa Trejo Brenda Jacqueline | 05/02/1994 | 32 | M | ZATB940205MDGMRR03 | Fracc. SAHOP, 34190 (credencial sin calle)
31. Rodríguez Galaviz Olivia | 17/03/1993 | 33 | M | ROGO930317MCHDLL05 | C Niebla 207, Fracc. Las Nubes, 34224 (nac. Chihuahua)
32. Gaytán Ortiz Irving Jezreel | 22/07/2002 | 23 | H | GAOI020722HDGYRRA7 | C Jorge Clemente Mojica 102, Col. Recuerdo del Pasado, 34027
33. Castañeda Jara Erick Alberto | 08/08/2006 | 19 | H | CAJE060808HDGSRRA8 | C 29 de Septiembre 603, Col. Primero de Mayo, 34125
34. Bobadilla Calleros Alicia | 13/01/2006 | 20 | M | BOCA060113MDGBLLA4 | C Simón Bolívar 610, Col. J. Guadalupe Rodríguez, 34280
35. Félix Blanco Paula Eloísa | 28/04/2004 | 22 | M | FEBP040428MDGLLLA3 | C Puerto de Guaymas 214, Col. Maderera, 34050
36. Ortega Galván Manuel de Jesús | 09/08/1985 | 40 | H | OEGM850809HDGRLN04 | C de la Hermandad 442, Col. Constituyentes, 34164
37. Serrato Tinoco Jorge Alejandro | 21/04/1994 | 32 | H | SETJ940421HDGRNR05 | C Orión 724, Fracc. Villas del Guadiana II, 34224
38. Gallegos Flores Juan Carlos | 04/11/1967 | 58 | H | GAFJ671104HDGLLN02 | C Capela 922, Fracc. Villas del Guadiana III, 34224
39. Anguiano Nájera Marcos Omar | 23/05/2004 | 22 | H | AUNM040523HDGNJRA3 | C Villa Ahumada 114, Fracc. Quintas del Real, 34235 — BD dice "Marcos": agregar "Omar"
40. Rodríguez Cardiel Alberto Felipe | 13/05/1997 | 29 | H | ROCA970513HDGDRL07 | C Aserraderos 600, Col. Santa María, 34050
41. González Salazar Edgar Iván | 23/10/1984 | 41 | H | GOSE841023HDFNLD05 | Fracc. Colinas del Saltito, 34105 (credencial sin calle; nac. CDMX)
42. Cabral Miriam Janette | 13/09/1983 | 42 | M | CAXM830913MDGBXR05 | Luis Donaldo 122, El Ciprés Cerro del Mercado, 34030 (fuente: licencia conducir; apellido único)
43. Núñez Ortiz Adriana Carolina | 08/09/1983 | 42 | M | NUOA830908MDGXRD03 | 1 Priv. Lerdo 3, Barrio de Analco, 34138
44. Núñez Cabrales Joshua Hibrain | 15/08/2006 | 19 | H | NUCJ060815HDGXBSA7 | C Salvador Nava 143 Ote., Zona Centro, 34000

PRÓXIMA ACCIÓN CRÍTICA (deadline 2 sem): (1) DESKTOP: pull f8a528c + parches 14/15/16 +
backup v8, (2) resolver 3 insumos del PARCHE_17 y construirlo, (3) destrabar PR Iván →
Grupo A con FLUJOS.md como espec, (4) ruta crítica sigue siendo backend conectado al bento.