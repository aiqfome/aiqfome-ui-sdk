import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sdkRoot = resolve(__dirname, '../..');

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@aiqfome-org/geraldo-ui/auth',
        replacement: resolve(sdkRoot, 'src/auth/index.ts'),
      },
    ],
  },
  server: {
    port: 5175,
  },
});
