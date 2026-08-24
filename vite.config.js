import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

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
  }
})
