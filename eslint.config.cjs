const tsParser = require('@typescript-eslint/parser')
const tailwind = require('eslint-plugin-tailwindcss')
const tsPlugin = require('@typescript-eslint/eslint-plugin')

module.exports = [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { tailwindcss: tailwind, '@typescript-eslint': tsPlugin },
    rules: {
      'tailwindcss/no-arbitrary-value': 'error',
    },
  },
]
