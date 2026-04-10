import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sdkRoot = resolve(__dirname, '../..');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = env.VITE_PROXY_API_TARGET || 'https://api.aiqfome.com';
  const platformTarget = env.VITE_PROXY_PLATFORM_TARGET || 'https://plataforma.aiqfome.com';

  return {
    resolve: {
      alias: [
        {
          find: '@aiqfome-org/geraldo-ui/tokens.css',
          replacement: resolve(sdkRoot, 'src/tokens/geraldo-tokens.css'),
        },
        {
          find: '@aiqfome-org/geraldo-ui/auth',
          replacement: resolve(sdkRoot, 'src/auth/index.ts'),
        },
        {
          find: '@aiqfome-org/geraldo-ui',
          replacement: resolve(sdkRoot, 'src/index.ts'),
        },
      ],
    },
    server: {
      port: 5180,
      proxy: {
        '/api/aiqfome': {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/aiqfome/, ''),
        },
        '/api/plataforma': {
          target: platformTarget,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/plataforma/, ''),
        },
      },
    },
  };
});
