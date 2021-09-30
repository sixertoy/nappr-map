import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import autoprefixer from 'autoprefixer';
import builtins from 'builtin-modules';
import postcss from 'postcss';
import babel from 'rollup-plugin-babel';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import sass from 'rollup-plugin-sass';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';

import { main, module, name } from './package.json';

require('dotenv').config();

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const globals = {
  firebase: 'firebase',
  'prop-types': 'PropTypes',
  react: 'React',
  'react-dom': 'ReactDom',
};

const plugins = [
  url(),
  excludeDependenciesFromBundle(),
  resolve({ extensions: ['.js', '.jsx'] }),
  babel({
    babelrc: true,
    exclude: ['node_modules/**'],
    runtimeHelpers: true,
  }),
  commonjs(),
  sass({
    output: 'lib/styles.css',
    processor: css =>
      postcss([autoprefixer])
        .process(css)
        .then(result => result.css),
  }),
  sizeSnapshot(),
  IS_DEVELOPMENT ? null : terser(),
].filter(v => v);

export default {
  external: [builtins],
  input: 'src/index.js',
  output: [
    {
      file: main,
      format: 'cjs',
      globals,
      name,
      sourcemap: true,
    },
    {
      file: module,
      format: 'esm',
      globals,
      name,
      sourcemap: true,
    },
  ],
  plugins,
};
