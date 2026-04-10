import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AiqfomeUiLit',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: (id) => id === 'lit' || id.startsWith('lit/') || id === '@aiqfome-sdk/themes',
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    dts({
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts'],
      rollupTypes: true,
      outDir: 'dist',
    }),
  ],
});
