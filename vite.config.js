import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed at https://chehakmiglani.github.io (root), so base is '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
