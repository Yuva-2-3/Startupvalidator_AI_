import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',  // Ensure Vercel detects this output directory
    emptyOutDir: true,  // Clears old builds before new deployment
  },
});
