import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Vite equivalent for history fallback
    // No direct historyApiFallback option exists in Vite
  },
  optimizeDeps: {
    // Remove the exclude for lucide-react unless absolutely necessary
    // exclude: ['lucide-react'],
  }
});