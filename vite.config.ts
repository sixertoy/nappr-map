import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isDevelopment = env.VITE_USER_NODE_ENV === 'development';

  return {
    plugins: [
      react(),
      // Ce plugin génère automatiquement les fichiers de types (.d.ts)
      // et les place dans votre dossier dist.
      dts({
        outDir: 'dist/types',
        insertTypesEntry: true,
      }),
    ],
    build: {
      minify: true,
      sourcemap: true,
      watch: isDevelopment ? {} : undefined,
      lib: {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        name: 'napprMap',
        formats: ['es', 'umd'],
        fileName: (format) => `nappr-map.${format}.js`,
        cssFileName: 'styles',
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'leaflet',
          'react-leaflet',
          'react/jsx-runtime',
          'react-dom/server',
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-leaflet': 'ReactLeaflet',
            leaflet: 'L',
            'react/jsx-runtime': 'jsxRuntime',
            'react-dom/server': 'ReactDOMServer',
          },
        },
      },
    },
  };
});
