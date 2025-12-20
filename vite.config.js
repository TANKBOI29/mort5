import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ghPages } from "vite-plugin-gh-pages";

// https://vite.dev/config/
export default defineConfig({
  base: "/mort5/",
  plugins: [
    react(),
    tailwindcss(),
    ghPages(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    theme: {
      extend: {
        fontFamily: {
          orbitron: ['Orbitron', 'sans-serif'],
        },
      },
    },
  },
})
