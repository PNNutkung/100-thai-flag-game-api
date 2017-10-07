module.exports = {
  extends: 'standard',
  plugins: [ 'prettier' ],
  rules: {
    semi: [ 'error', 'never' ]
  },
  env: {
    browser: true,
    node: true
  }
}
