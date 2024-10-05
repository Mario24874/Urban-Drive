import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Agrupar módulos específicos en chunks separados
            if (id.includes('react')) {
              return 'react';
            }
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            if (id.includes('firebase')) {
              return 'firebase';
            }
            // Agrupar el resto de módulos de node_modules en un chunk llamado 'vendor'
            return 'vendor';
          }

          // Agrupar todos los componentes de React en un chunk llamado 'react-components'
          if (id.includes('src/components')) {
            return 'react-components';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Aumenta el límite a 1 MB
  },
});