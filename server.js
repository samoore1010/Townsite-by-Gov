// Townsite static server.
// Serves the sealed Claude Design export in ./design exactly as exported.
// No build step, no transformation of any design file.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'design');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, { ...SECURITY_HEADERS, ...headers });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method not allowed', { Allow: 'GET, HEAD' });
  }

  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/healthz') {
    return send(res, 200, 'ok', { 'Content-Type': 'text/plain' });
  }
  if (url.pathname === '/favicon.ico') {
    return send(res, 204, '');
  }

  let rel = decodeURIComponent(url.pathname);
  if (rel.endsWith('/')) rel += 'index.html';
  const file = path.normalize(path.join(ROOT, rel));

  // Prevent path traversal outside ./design
  if (!file.startsWith(ROOT + path.sep) && file !== ROOT) {
    return send(res, 403, 'Forbidden');
  }

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      // Single-page app: unknown paths fall back to the app shell.
      return serveFile(path.join(ROOT, 'index.html'), req, res);
    }
    serveFile(file, req, res);
  });
});

function serveFile(file, req, res) {
  const ext = path.extname(file).toLowerCase();
  const type = TYPES[ext] || 'application/octet-stream';
  const isAsset = file.includes(`${path.sep}assets${path.sep}`);
  const headers = {
    'Content-Type': type,
    'Cache-Control': isAsset ? 'public, max-age=31536000, immutable' : 'no-cache',
  };
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 500, 'Server error');
    send(res, 200, req.method === 'HEAD' ? '' : data, headers);
  });
}

server.listen(PORT, () => {
  console.log(`Townsite listening on port ${PORT}`);
});
