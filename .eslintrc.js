module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'linebreak-style': 0,
  },
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        '**/*.test.ts',
        '**/*.test.tsx',
      ],
    },
  ],
};
