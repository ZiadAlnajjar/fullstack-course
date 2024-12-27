import globals from 'globals';
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';


/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      'curly': 'error',
      'eqeqeq': 'error',
      'no-console': 'off',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'rest-spread-spacing': 'error',
      'dot-location': ['error', 'property'],
      '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/js/newline-per-chained-call': 'error',
      '@stylistic/js/function-call-spacing': 'error',
      '@stylistic/js/eol-last': 'error',
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'always'],
      '@stylistic/js/object-property-newline': ['error', {
        'allowAllPropertiesOnSameLine': true
      }],
      '@stylistic/js/arrow-parens': 'error',
      '@stylistic/js/key-spacing': ['error',{ 'align': 'colon' }],
      '@stylistic/js/no-multiple-empty-lines': ['error', {
        'max': 2, 'maxEOF': 1, 'maxBOF': 0
      }],
      '@stylistic/js/max-len': ['error', {
        'ignoreStrings': true,
        'ignoreRegExpLiterals': true,
        'ignoreTemplateLiterals': true,
      }],
    },
    ignores: ['dist/**', 'build/**'],
  },
]
