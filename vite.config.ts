import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import * as packageJson from './package.json';

// https://vitejs.dev/config/#configuring-vite 🤷
export default defineConfig(({ mode }) => {
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
        name: 'napprMap',
        formats: ['es', 'umd'],
        fileName: (format) => `nappr-map.${format}.js`,
        cssFileName: 'styles',
      },
      rollupOptions: {
        output: {
          globals: {
            react: 'React',
            leaflet: 'Leaflet',
            'react-dom': 'ReactDOM',
            'react-leaflet': 'ReactLeaflet',
            'react/jsx-runtime': 'jsxRuntime',
          },
        },
        external: [
          ...Object.keys(packageJson.peerDependencies || {}),
          'react/jsx-runtime',
        ],
      },
    },
  };
});
