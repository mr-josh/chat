import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: resolve("./src/assets"),
      components: resolve("./src/components"),
      pages: resolve("./src/pages"),
      style: resolve("./src/style"),
    },
  },
});
