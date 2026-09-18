import { defineConfig, type Plugin } from 'vite';
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
      // GitHub Pages SPA fallback: serve index.html on 404 so client routing works on reload
      try {
        cpSync(join(outDir, 'index.html'), join(outDir, '404.html'));
      } catch {
        // index.html not yet written
      }
    },
  };
}

// Proxies /api/* to Supabase so the browser never makes cross-origin requests.
// Works in both `vite dev` and `vite preview` (configurePreviewServer).
function supabaseProxyPlugin(): Plugin {
  const target = 'https://kqiggndvkekcbbjbirue.supabase.co';
  const handler = (pathname: string) => {
    if (pathname.startsWith('/api/rest/')) {
      return pathname.replace(/^\/api\/rest/, '/rest');
    }
    if (pathname.startsWith('/api/functions/')) {
      return pathname.replace(/^\/api\/functions/, '/functions');
    }
    return null;
  };

  return {
    name: 'supabase-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        const rewritten = handler(url.split('?')[0]);
        if (!rewritten) return next();

        const headers: Record<string, string> = {};
        for (const [key, ...values] of Object.entries(req.headers)) {
          if (values) headers[key] = values.join(', ');
        }

        try {
          const resp = await fetch(target + rewritten, {
            method: req.method || 'GET',
            headers,
            body: req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH'
              ? await new Promise<Buffer>((resolve) => {
                  const chunks: Buffer[] = [];
                  req.on('data', (c: Buffer) => chunks.push(c));
                  req.on('end', () => resolve(Buffer.concat(chunks)));
                })
              : undefined,
          } as RequestInit);
          res.statusCode = resp.status;
          resp.headers.forEach((v, k) => res.setHeader(k, v));
          res.setHeader('Access-Control-Allow-Origin', '*');
          const body = await resp.arrayBuffer();
          res.end(Buffer.from(body));
        } catch (e) {
          res.statusCode = 502;
          res.end(JSON.stringify({ error: 'Proxy error' }));
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        const rewritten = handler(url.split('?')[0]);
        if (!rewritten) return next();

        const headers: Record<string, string> = {};
        for (const [key, ...values] of Object.entries(req.headers)) {
          if (values) headers[key] = values.join(', ');
        }

        try {
          const resp = await fetch(target + rewritten, {
            method: req.method || 'GET',
            headers,
            body: req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH'
              ? await new Promise<Buffer>((resolve) => {
                  const chunks: Buffer[] = [];
                  req.on('data', (c: Buffer) => chunks.push(c));
                  req.on('end', () => resolve(Buffer.concat(chunks)));
                })
              : undefined,
          } as RequestInit);
          res.statusCode = resp.status;
          resp.headers.forEach((v, k) => res.setHeader(k, v));
          res.setHeader('Access-Control-Allow-Origin', '*');
          const body = await resp.arrayBuffer();
          res.end(Buffer.from(body));
        } catch (e) {
          res.statusCode = 502;
          res.end(JSON.stringify({ error: 'Proxy error' }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), safeCopyPublicDir(), supabaseProxyPlugin()],
  optimizeDeps: {
    exclude: [],
  },
});
