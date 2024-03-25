module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname
  },
  env: {
    es6: true
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'coverage/', 'vite.config.ts'],
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect'
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.tsx']
      }
    },
    excludedFiles: ['**/*.spec.*']
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/semi': [2, 'never'],
    'prefer-arrow-callback': ['error'],
    'react/react-in-jsx-scope': ['off'],
    'prefer-const': 'error',
    'no-param-reassign': 'error',
    'no-var': 'error',
    'react/prop-types': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'off',
    'no-restricted-syntax': [
      'error',
      'FunctionDeclaration'
    ],
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
