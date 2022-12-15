import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/integration/**/*",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
