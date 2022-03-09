module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-underscore-dangle': 0,
    'func-names': ['error', 'never'],
    'consistent-return': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
