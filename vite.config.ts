import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, cpSync, mkdirSync } from 'fs';
import { join } from 'path';

// Skips files with spaces in their name (e.g. "image copy.jpg") that cause EAGAIN errors
function safeCopyPublicDir(): Plugin {
  return {
    name: 'safe-copy-public-dir',
    apply: 'build',
    configResolved(config) {
      (config as { publicDir: string | false }).publicDir = false;
    },
    closeBundle() {
      const publicDir = join(process.cwd(), 'public');
      const outDir = join(process.cwd(), 'dist');
      try {
        const files = readdirSync(publicDir);
        for (const file of files) {
          if (file.includes(' ')) continue;
          mkdirSync(outDir, { recursive: true });
          cpSync(join(publicDir, file), join(outDir, file), { recursive: true });
        }
      } catch {
        // no public dir
      }
      try {
        cpSync(join(outDir, 'index.html'), join(outDir, '404.html'));
      } catch {
        // index.html not yet written
      }
    },
  };
}

const SUPABASE_URL = 'https://kqiggndvkekcbbjbirue.supabase.co';

function supabaseProxyPlugin(): Plugin {
  const matchers: { prefix: string; replace: string }[] = [
    { prefix: '/api/rest/', replace: '/rest/' },
    { prefix: '/api/functions/', replace: '/functions/' },
  ];

  function rewrite(url: string): string | null {
    for (const m of matchers) {
      if (url.startsWith(m.prefix)) {
        return m.replace + url.slice(m.prefix.length);
      }
    }
    return null;
  }

  function installMiddleware(server: ViteDevServer) {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url || '';
      const path = rewrite(url.split('?')[0]);
      if (!path) return next();

      // Collect request headers
      const headers: Record<string, string> = {};
      for (const [key, value] of Object.entries(req.headers)) {
        if (value) headers[key] = Array.isArray(value) ? value.join(', ') : value;
      }

      // Collect request body for POST/PUT/PATCH
      let body: Buffer | undefined;
      if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        const chunks: Buffer[] = [];
        for await (const chunk of req) {
          chunks.push(chunk as Buffer);
        }
        body = Buffer.concat(chunks);
      }

      try {
        const targetUrl = SUPABASE_URL + path;
        const resp = await fetch(targetUrl, {
          method: req.method || 'GET',
          headers,
          body: body,
        });

        res.statusCode = resp.status;
        resp.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });
        res.setHeader('Access-Control-Allow-Origin', '*');

        const respBody = await resp.arrayBuffer();
        res.end(Buffer.from(respBody));
      } catch (err) {
        console.error('[supabase-proxy] Error:', err);
        res.statusCode = 502;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Proxy error', detail: String(err) }));
      }
    });
  }

  return {
    name: 'supabase-proxy',
    configureServer: installMiddleware,
    configurePreviewServer: installMiddleware,
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), safeCopyPublicDir(), supabaseProxyPlugin()],
  optimizeDeps: {
    exclude: [],
  },
});
