module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true
  },
  plugins: ['@typescript-eslint', 'functional', 'unused-imports', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:functional/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'plugin:react-hooks/recommended'
  ],
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect'
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    excludedFiles: ['**/*.spec.*']
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'functional/no-classes': ['off'],
    'functional/no-expression-statements': ['off'],
    '@typescript-eslint/semi': [2, 'never'],
    'prefer-arrow-callback': ['error'],
    'functional/prefer-readonly-type': ['off'] ,
    'functional/prefer-immutable-types': ['off'] ,
    'functional/no-return-void': ['off'],
    'functional/functional-parameters': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'prefer-const': 'error',
    'no-param-reassign': 'error',
    'no-var': 'error',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error', { allowHigherOrderFunctions: true,  allowExpressions: true }],
    'no-restricted-syntax': [
      'error',
      'FunctionDeclaration'
    ],
    'unused-imports/no-unused-imports': 'error'
  }
}
