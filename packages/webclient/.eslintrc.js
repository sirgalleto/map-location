module.exports = {
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  plugins: ['jest'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
