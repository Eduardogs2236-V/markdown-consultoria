// ARNES DE VALIDACION
// Carga el <script> real del conversor (index.html) en un sandbox con DOM
// stubeado, extrae las funciones del pipeline y las corre sobre el PDF usando
// el MISMO pdf.js 3.11.174. Reproduce fielmente la conversion del navegador.
//
//   node validar.cjs <index.html> <pdf> <paginas|all>
//
const fs = require("fs");
const vm = require("vm");
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");

const HTML  = process.argv[2] || "G:\\Mi unidad\\CONSULTORIA\\MARKDOWN\\conversor\\index.html";
const PDF   = process.argv[3] || "C:\\Users\\1\\Downloads\\document_pdf.pdf";
const PAGS  = process.argv[4] || "3";

// ---- 1) Cargar el pipeline real desde el HTML, en un sandbox ----
function cargarPipeline(htmlPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const code = scripts.sort((a, b) => b.length - a.length)[0]; // el script mas grande = la app
  const noop = function () { return undefined; };
  const el = new Proxy(function () {}, {
    get: (t, p) => (p === "style" ? {} : (p === "value" ? "" : el)),
    set: () => true, apply: () => el, construct: () => el,
  });
  const documentStub = {
    getElementById: () => el, querySelector: () => el, querySelectorAll: () => [],
    createElement: () => el, addEventListener: () => {}, body: el, head: el,
  };
  const sandbox = {
    window: {}, document: documentStub, navigator: { hardwareConcurrency: 4 },
    console: { log: () => {}, warn: () => {}, error: () => {}, table: () => {} },
    setTimeout, clearTimeout,
    pdfjsLib: { GlobalWorkerOptions: {}, getDocument: () => ({ promise: Promise.resolve() }) },
    mammoth: {}, XLSX: {}, Tesseract: { createWorker: async () => ({}) },
    TurndownService: function () { this.turndown = x => x; },
    URL: { createObjectURL: () => "", revokeObjectURL: () => {} },
    Blob: function () {}, Image: function () {}, alert: () => {}, fetch: () => Promise.resolve(),
  };
  sandbox.globalThis = sandbox; sandbox.self = sandbox;
  vm.createContext(sandbox);
  try { vm.runInContext(code, sandbox, { filename: "conversor-app.js" }); }
  catch (e) { /* el cableado DOM final puede fallar; las funciones ya estan declaradas */ }
  const pick = n => sandbox[n] || sandbox.window[n];
  const faltan = ["reconstruirColumnas", "procesarDigitalTexto"].filter(n => typeof pick(n) !== "function");
  if (faltan.length) throw new Error("No se cargaron funciones del pipeline: " + faltan.join(", "));
  return {
    reconstruirColumnas: pick("reconstruirColumnas"),
    procesarDigitalTexto: pick("procesarDigitalTexto"),
    ejecutarPruebas: pick("ejecutarPruebas"),
    detectarCorte: pick("detectarCorte"),
  };
}

// ---- 2) Extraer items de una pagina (igual que el conversor) ----
async function itemsDePagina(doc, i) {
  const page = await doc.getPage(i);
  const ancho = page.getViewport({ scale: 1 }).width;
  const cont = await page.getTextContent();
  const items = cont.items.map(it => ({ str: it.str, x: it.transform[4], y: it.transform[5], w: it.width || 0 }));
  return { items, ancho };
}

function expandirPaginas(spec, total) {
  if (spec === "all") return Array.from({ length: total }, (_, k) => k + 1);
  return spec.split(",").flatMap(s => {
    if (s.includes("-")) { const [a, b] = s.split("-").map(Number); return Array.from({ length: b - a + 1 }, (_, k) => a + k); }
    return [Number(s)];
  });
}

(async () => {
  const P = cargarPipeline(HTML);

  if (PAGS === "test") {
    if (typeof P.ejecutarPruebas !== "function") throw new Error("ejecutarPruebas no disponible");
    const r = P.ejecutarPruebas();
    console.log(`PRUEBAS: ${r.pasaron}/${r.total} PASS  ${r.fallaron} FAIL`);
    r.detalle.filter(d => /FAIL/.test(d.resultado)).forEach(d =>
      console.log(`  FAIL ${d.id} | obtenido=${JSON.stringify(d.obtenido)} | esperado=${JSON.stringify(d.esperado)}`));
    return;
  }

  if (process.env.DBG) {
    console.error("DBG reconstruirColumnas usa marcarVinetas:", /marcarVinetas/.test(P.reconstruirColumnas.toString()));
    console.error("DBG procesarDigitalTexto:", P.procesarDigitalTexto.toString().slice(0, 120));
  }
  const data = new Uint8Array(fs.readFileSync(PDF));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
  const SCAN = PAGS === "scan";
  const paginas = expandirPaginas(SCAN ? "all" : PAGS, doc.numPages);

  for (const i of paginas) {
    if (i < 1 || i > doc.numPages) continue;
    const { items, ancho } = await itemsDePagina(doc, i);
    if (SCAN) {
      const its = items.filter(it => it.str && it.str.trim());
      const corte = P.detectarCorte ? P.detectarCorte(its, ancho) : null;
      const md = P.procesarDigitalTexto(P.reconstruirColumnas(items, ancho, []));
      const primera = (md.split("\n").find(l => l.trim()) || "").slice(0, 60);
      console.log(`p${String(i).padStart(2)} | ${corte ? "2col @" + Math.round(corte) : "1col    "} | ${primera}`);
      continue;
    }
    const reconstruido = P.reconstruirColumnas(items, ancho, []);
    const md = P.procesarDigitalTexto(reconstruido);
    if (process.env.DBG) {
      console.error(`--- RECONSTRUIDO p${i} (lineas con 'Read all'/'Lea todas') ---`);
      reconstruido.split("\n").filter(l => /Read all|Lea todas|^- /.test(l)).slice(0, 4).forEach(l => console.error(JSON.stringify(l)));
    }
    console.log(`\n================= PAGINA ${i} =================`);
    console.log(md);
  }
})().catch(e => { console.error("ERROR:", e.stack || e.message); process.exit(1); });
