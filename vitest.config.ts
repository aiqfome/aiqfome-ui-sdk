import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
    /** `forks` falha em alguns sandboxes ao fechar workers; `threads` + singleThread é mais estável. */
    pool: 'threads',
    maxWorkers: 1,
    fileParallelism: false,
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});
