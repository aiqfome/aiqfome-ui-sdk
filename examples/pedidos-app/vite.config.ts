import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sdkRoot = resolve(__dirname, '../..');

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@aiqfome/geraldo-ui/tokens.css',
        replacement: resolve(sdkRoot, 'src/tokens/geraldo-tokens.css'),
      },
      {
        find: '@aiqfome/geraldo-ui',
        replacement: resolve(sdkRoot, 'src/index.ts'),
      },
    ],
  },
  server: {
    port: 5174,
  },
});
