module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-var-requires':
      'off' /* FIXME: Set to "error" in the long run. Turned off for now to get TypeScript setup up and running without having to touch every single file */,
  },
  env: {
    node: true,
    jest: true,
  },
};
