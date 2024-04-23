/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    eqeqeq: ['warn', 'always', { null: 'ignore' }],
  },
}
