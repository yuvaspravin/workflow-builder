import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // Browser-like environment
    setupFiles: "./vitest.setup.ts",
    globals: true, // Enables describe/it/expect globally
  },
});
