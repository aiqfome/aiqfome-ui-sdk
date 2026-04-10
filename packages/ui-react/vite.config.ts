import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'AiqfomeUiReact',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: (id) =>
        id === 'react' ||
        id === 'react/jsx-runtime' ||
        id.startsWith('react/') ||
        id === 'react-dom' ||
        id.startsWith('react-dom/') ||
        id === 'lit' ||
        id.startsWith('lit/') ||
        id === '@lit/react' ||
        id.startsWith('@lit/react/') ||
        id === '@aiqfome-sdk/ui-lit' ||
        id.startsWith('@aiqfome-sdk/ui-lit/'),
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      rollupTypes: true,
      outDir: 'dist',
    }),
  ],
});
