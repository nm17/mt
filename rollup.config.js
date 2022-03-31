import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'dist/main.js',
  output: {
    name: 'mt',
    file: 'dist/mt.big.mjs',
    format: 'esm',
  },
  plugins: [commonjs(), resolve()],
};
