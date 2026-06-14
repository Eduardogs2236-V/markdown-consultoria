// Servidor local para el Conversor a Markdown.
// Uso: abre una terminal en esta carpeta y ejecuta:  node _servidor-local.js
// Luego abre en el navegador:  http://localhost:5599/MARKDOWN_V1.html
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.md':'text/plain', '.json':'application/json' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/MARKDOWN_V1.html';
  const fp = path.join(root, p);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('no encontrado'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(fp)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(5599, () => console.log('Conversor en http://localhost:5599/MARKDOWN_V1.html'));
