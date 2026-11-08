import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/*.test.js'],
    maxWorkers: 12,
    setupFiles: ['./watch.js'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'webkit' }],
    },
  },
});
