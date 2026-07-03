# markdown-consultoria — Conversor de documentos a Markdown

Conversor **sin backend** (HTML + CSS + JS) que convierte PDF, DOCX, XLSX, TXT e
imágenes a Markdown, con calibración de OCR y de layout multi-columna. Pensado
para codificar documentos y cargarlos en herramientas tipo Claude sin gastar
tokens en el procesamiento crudo.

## Estructura del repositorio

| Ruta | Contenido |
|------|-----------|
| `conversor/index.html` | **Conversor actual (v1.3.0)**. Se abre en el navegador. |
| `extracciones/` | Salidas de validación. `v6.md` = manual KitchenAid (40 pág., bilingüe). |
| `historico/` | Versiones HTML anteriores (v1.x), solo referencia. |
| `test/` | Arnés de validación (scripts). Ver nota de ejecución abajo. |

> **Nota:** el conversor vivía antes dentro del proyecto *La Finca*. Se separó a
> este repositorio para no mezclar proyectos. La Finca ya no contiene el conversor.

## Versionado

- **Conversor (código):** v1.3.0
- **Extracción de auditoría (manual KitchenAid):** v6 — `extracciones/v6.md`

### Errores de auditoría (E-01…E-09)

| Código | Descripción | Estado v6 |
|--------|-------------|-----------|
| E-01 | URLs con espacio en la diagonal | ✅ resuelto |
| E-02 | Viñetas perdidas (glifo extraído como `U+001F`) | ✅ resuelto en v6 |
| E-03 | "Do Not Use"/"Uso no permitido" antes que la columna izquierda | ✅ resuelto en v6 |
| E-04 | Separador `---` residual | ✅ resuelto |
| E-05–E-09 | Palabras partidas (`re commendations`, `func tion`, `micro wave`, `un pleasant`, `vine gar`) | ✅ resuelto |

**v6 = 0 errores activos.** TestSuite interno: 49/49.

#### Causas raíz (verificadas con pdf.js sobre el documento real)

- **E-02:** el glifo de viñeta cuadrada NO se extrae como `■`, sino como el
  carácter de control **`U+001F`**. Por eso la regla `■→-` nunca actuaba.
  `preservarVinetas()` ahora normaliza ese carácter a un item de lista `- `,
  sin codificar números de página (modo seguro, general).
- **E-03:** en páginas-tabla, el detector de canalón fallaba y la página se
  ordenaba por Y, subiendo "Do Not Use" al tope. `detectarCorte()` ahora usa
  **conteo de cruces** y exige una franja central con **cero cruces** (canalón
  limpio). Separa correctamente las páginas-tabla sin partir las páginas mixtas
  (intro a todo lo ancho) ni las de una sola columna.

## Cómo validar (arnés)

El arnés corre el **pipeline real del conversor** (carga su `<script>` en un
sandbox) sobre el PDF, usando el **mismo pdf.js 3.11.174** que el navegador.

> Las dependencias (`node_modules`, pdf.js) se instalan en una carpeta **local
> fuera de Google Drive** (Drive bloquea la escritura de miles de archivos).
> Carpeta del toolchain: `C:\Users\1\md-harness` (con `npm install`).

```powershell
cd C:\Users\1\md-harness
node validar.cjs "<ruta>\conversor\index.html" "<ruta>\documento.pdf" 3      # una página
node validar.cjs "<ruta>\conversor\index.html" "<ruta>\documento.pdf" test   # TestSuite (49/49)
node validar.cjs "<ruta>\conversor\index.html" "<ruta>\documento.pdf" scan   # resumen 1col/2col por página
node validar.cjs "<ruta>\conversor\index.html" "<ruta>\documento.pdf" all    # extracción completa
```
