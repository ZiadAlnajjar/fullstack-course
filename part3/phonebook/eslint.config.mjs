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
      'object-curly-spacing': [
        'error',
        'always'
      ],
      'arrow-spacing': [
        'error',
        { 'before': true, 'after': true },
      ],
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'always'
      ],
    },
    ignores: ['dist/**', 'build/**'],
  },
]