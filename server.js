import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Specific route for service worker with Service-Worker-Allowed header and no-cache
app.get(['/sw.js', '/Celou/sw.js'], (req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, 'sw.js'));
});

// Specific route for manifest.json with standard manifest mime type
app.get(['/manifest.json', '/Celou/manifest.json'], (req, res) => {
  res.setHeader('Content-Type', 'application/manifest+json; charset=UTF-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, 'manifest.json'));
});

// Serve static assets from project root
app.use(express.static(__dirname));

// Also route /Celou/ prefix to root directory to maintain compatibility with legacy GitHub Pages paths
app.use('/Celou', express.static(__dirname));

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Celou Rental Property server running at http://0.0.0.0:${PORT}`);
});
