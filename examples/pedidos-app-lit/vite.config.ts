import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** Monorepo root — allow Vite to read linked `packages/*` outside this example. */
const workspaceRoot = path.resolve(__dirname, '../..');

export default defineConfig({
  resolve: {
    dedupe: ['lit'],
  },
  server: {
    port: 5174,
    fs: {
      allow: [workspaceRoot],
    },
  },
});
