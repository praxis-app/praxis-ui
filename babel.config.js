module.exports = {
  env: {
    test: {
      plugins:[ 
        ["@babel/plugin-transform-modules-commonjs"],
        ["@babel/plugin-proposal-private-methods"],
      ]
    }
  },

  "presets": [
    ['@babel/preset-env', { 'targets': { 'node': 'current' } }],
    ['@babel/preset-typescript'],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['next/babel'],
  ]
}