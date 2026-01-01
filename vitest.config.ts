import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        projects: ['**/{vite,vitest}.config.{ts,mts}'],
    },
});
