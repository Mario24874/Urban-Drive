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
            if (id.includes('mapbox-gl')) {
              return 'mapbox-gl';
            }
            // Agrupar el resto de módulos de node_modules en un chunk llamado 'vendor'
            return 'vendor';
          }

          // Agrupar todos los componentes de React en un chunk llamado 'react-components'
          if (id.includes('src/components')) {
            return 'react-components';
          }

          // Agrupar todos los hooks en un chunk llamado 'hooks'
          if (id.includes('src/hooks')) {
            return 'hooks';
          }

          // Agrupar todas las páginas en un chunk llamado 'pages'
          if (id.includes('src/pages')) {
            return 'pages';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500, // Aumenta el límite a 1 MB
  },
});