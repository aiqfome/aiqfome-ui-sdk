import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

/** Build do subpath `@aiqfome-org/geraldo-ui/auth` (sem Lit). */
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/auth/index.ts'),
      name: 'GeraldoAuth',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    outDir: 'dist/auth',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        preserveModules: false,
      },
    },
  },
  plugins: [
    dts({
      entryRoot: resolve(__dirname, 'src/auth'),
      include: ['src/auth/**/*.ts'],
      exclude: ['src/auth/**/*.test.ts', '**/*.test.ts'],
      /** Não usar `rollupTypes` aqui: agrega o projeto inteiro no `.d.ts` do auth. */
      rollupTypes: false,
      outDir: 'dist/auth',
    }),
  ],
});
