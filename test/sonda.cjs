// Sonda de geometria: vuelca items (x,y,w,str) por pagina, agrupados en lineas
// SIN recortar, para ver sangrias (vinetas) y posiciones (columnas / "Do Not Use").
const fs = require("fs");
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");

const PDF = process.argv[2] || "C:\\Users\\1\\Downloads\\document_pdf.pdf";
const PAGINAS = (process.argv[3] || "3,12").split(",").map(Number);

(async () => {
  const data = new Uint8Array(fs.readFileSync(PDF));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
  console.log("TOTAL PAGINAS:", doc.numPages);

  for (const i of PAGINAS) {
    if (i < 1 || i > doc.numPages) continue;
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale: 1 });
    const tc = await page.getTextContent();
    const items = tc.items
      .filter(it => it.str !== undefined)
      .map(it => ({ str: it.str, x: +it.transform[4].toFixed(1), y: +it.transform[5].toFixed(1), w: +(it.width || 0).toFixed(1) }));

    // Agrupar en lineas por Y (tol 3), ordenar arriba->abajo, items izq->der
    const TOL = 3, lineas = [];
    items.forEach(it => {
      let L = lineas.find(l => Math.abs(l.y - it.y) <= TOL);
      if (!L) { L = { y: it.y, items: [] }; lineas.push(L); }
      L.items.push(it);
    });
    lineas.sort((a, b) => b.y - a.y);

    console.log(`\n===== PAGINA ${i}  (ancho=${vp.width.toFixed(0)}, items=${items.length}) =====`);
    for (const L of lineas) {
      L.items.sort((a, b) => a.x - b.x);
      const minX = L.items[0].x;
      const txt = L.items.map(it => `${it.x}:"${it.str}"`).join("  ");
      console.log(`y=${L.y.toFixed(0).padStart(4)} x0=${minX.toFixed(0).padStart(4)} | ${txt}`);
    }
  }
})().catch(e => { console.error("ERROR:", e.message); process.exit(1); });
