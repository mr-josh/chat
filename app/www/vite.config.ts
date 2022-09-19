import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: resolve("./src/components"),
      hooks: resolve("./src/hooks"),
      pages: resolve("./src/pages"),
      style: resolve("./src/style"),
      utils: resolve("./src/utils"),
    },
  },
});
