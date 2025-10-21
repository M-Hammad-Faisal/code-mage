import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import perfectionist from 'eslint-plugin-perfectionist';
import jest from 'eslint-plugin-jest';
import tseslint from 'typescript-eslint';

const configs = tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        { newlinesBetween: 'never', ignoreCase: false },
      ],
      'perfectionist/sort-interfaces': ['error', { ignoreCase: false }],
      'perfectionist/sort-named-imports': [
        'error',
        {
          groupKind: 'types-first',
          ignoreCase: false,
        },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        { groupKind: 'types-first', ignoreCase: false },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          groupKind: 'types-first',
          ignoreCase: false,
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        { ignoreCase: false, newlinesBetween: 'never' },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowRegExp: true },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'object-shorthand': 'error',
      'require-await': 'off',
      'sort-keys': 'off',
    },
  },
  {
    ignores: [
      '.coverage',
      '.eslintrc.cjs',
      '.eslintrc.js',
      'commitlint.config.cjs',
      'commitlint.config.js',
      'dist',
      'eslint.config.cjs',
      'eslint.config.mjs',
      'jest.config.integration.js',
      'jest.config.js',
      'jest.setup.js',
      'knexfile.ts',
      'lib',
      'puppeteer.config.cjs',
      'puppeteer.config.js',
      'vitest.config.cts',
      'vitest.config.mts',
    ],
  },
  {
    files: ['__tests__/**/*.test.ts', '__integration_tests__/**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    files: ['__tests__/**/*.test.ts', '__integration_tests__/**/*.test.ts'],
    ...jest.configs['flat/recommended'],
  },
  {
    files: ['__tests__/**/*.test.ts', '__integration_tests__/**/*.test.ts'],
    ...jest.configs['flat/style'],
  },
  {
    files: ['__tests__/**/*.test.ts', '__integration_tests__/**/*.test.ts'],
    rules: {
      'jest/prefer-lowercase-title': [
        'error',
        { ignoreTopLevelDescribe: true },
      ],
    },
  }
);

export default configs;
