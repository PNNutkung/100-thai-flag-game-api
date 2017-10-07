module.exports = {
  extends: [ 'standard', 'prettier' ],
  plugins: [ 'prettier' ],
  rules: {
    semi: [ 'error', 'never' ],
    'space-before-function-paren': [ 'error', 'always' ],
    'space-before-blocks': [ 'error', 'always' ]
  },
  env: {
    browser: true,
    node: true
  }
}
