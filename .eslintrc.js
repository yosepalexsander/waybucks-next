module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@next/next/recommended',
    'next/core-web-vitals',
    'next',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'indent': ['error', 2],
    'quotes': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    '@typescript-eslint/quotes': [
      'error', 'single', { 'allowTemplateLiterals': true }
    ],
  },
};
