import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT,
    host: true,
    strictPort: true,
    proxy: {
      "/api": {
        target: process.env.SERVER_HOST,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  preview: {
    port: process.env.PORT,
    host: true,
    strictPort: true,
    proxy: {
      "/api": {
        target: process.env.SERVER_HOST,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
