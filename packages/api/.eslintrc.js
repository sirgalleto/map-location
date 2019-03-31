module.exports = {
  root: true,
  extends: ['airbnb'],
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'no-console': 'off',
  },
};
