module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:cypress/recommended',
    'next',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    camelcase: 'off',
    'react/jsx-no-bind': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          '**/*.cy.js',
          'cypress/**/*',
          '.jest/**/*',
          '**/test-utils.js',
        ],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'no-labels': [
      'error',
      {
        allowLoop: true,
      },
    ],
    'jsx-a11y/anchor-is-valid': 'warn',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'react/button-has-type': 'off',
    'prefer-regex-literals': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'import/prefer-default-export': 'off',
    '@next/next/no-page-custom-font': 'off',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src', 'node_modules'],
      },
    },
  },
};
