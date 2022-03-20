import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'dist/datacenter/main.js',
  output: {
    name: 'datacenter.js',
    file: 'dist/datacenter.big.mjs',
    format: 'esm'
  },
  plugins: [commonjs(), resolve()]
}
