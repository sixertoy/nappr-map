import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import * as packageJson from './package.json';

export default defineConfig(({ mode }) => {
  // https://vitejs.dev/config/#configuring-vite 🤷
  const env = loadEnv(mode, process.cwd());
  const isDevelopment = env.VITE_USER_NODE_ENV === 'development';
  return {
    plugins: [react()],
    build: {
      minify: true,
      sourcemap: true,
      watch: isDevelopment ? {} : undefined,
      lib: {
        entry: resolve(__dirname, 'src', 'index.ts'),
        name: 'NapprMap',
        formats: ['es', 'umd'],
        fileName: format => `nappr-map.${format}.js`,
        cssFileName: 'nappr-map',
      },
      rollupOptions: {
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-leaflet': 'reactLeaflet',
            leaflet: 'Leaflet',
          },
        },
        external: [...Object.keys(packageJson.peerDependencies)],
      },
    },
  };
});
