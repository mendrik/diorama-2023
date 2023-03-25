module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true
  },
  plugins: ['@typescript-eslint', 'functional', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:functional/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier'
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
    "functional/no-mixed-types": ["off"],
    "comma-dangle": ["error", "never"],
    "functional/no-classes": ["off"],
    'functional/no-expression-statements': ['off'],
    'functional/no-conditional-statements': ['off'],
    '@typescript-eslint/semi': [2, 'never'],
    'arrow-body-style': ['warn', 'as-needed'],
    'prefer-arrow-callback': ['error'],
    'functional/prefer-readonly-type': ['off'] ,
    'functional/prefer-immutable-types': ['off'] ,
    'import/no-unresolved': ['off'],
    'functional/no-return-void': ['off'],
    'functional/functional-parameters': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'prefer-const': 'error',
    'no-param-reassign': 'warn',
    'no-var': 'error',
    'functional/no-let': 'error',
    'react/prop-types': 'error',
    '@typescript-eslint/explicit-function-return-type': ['error', { allowHigherOrderFunctions: true,  allowExpressions: true }],
    'no-restricted-syntax': [
      'error',
      'FunctionDeclaration'
    ],
    'unused-imports/no-unused-imports': 'error',
  }
}
