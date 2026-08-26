import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.js"),
      name: "IruxRouter",
      formats: ["es", "cjs"],
      fileName: (format) => format === "es" ? "irux-router.js" : "irux-router.cjs",
    },

    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        }
      },
    }
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
  }
})
