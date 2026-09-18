import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, cpSync, mkdirSync } from 'fs';
import { join } from 'path';

// Skips files with spaces in their name (e.g. "image copy.jpg") that cause EAGAIN errors
function safeCopyPublicDir(): import('vite').Plugin {
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

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), safeCopyPublicDir()],
  optimizeDeps: {
    exclude: [],
  },
  server: {
    proxy: {
      '/api/rest': {
        target: 'https://kqiggndvkekcbbjbirue.supabase.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rest/, '/rest'),
      },
      '/api/functions': {
        target: 'https://kqiggndvkekcbbjbirue.supabase.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/functions/, '/functions'),
      },
    },
  },
});
