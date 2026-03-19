import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  // Ignore patterns
  {
    ignores: [
      '.next/',
      'out/',
      'node_modules/',
      '*.min.js',
      '*.min.css',
      'next-env.d.ts',
      'postcss.config.mjs',
      'next.config.ts',
      'tailwind.config.ts',
      'commitlint.config.ts',
      '.lighthouserc.cjs',
    ],
  },

  // Next.js core-web-vitals — native flat config (no FlatCompat needed in v16)
  nextPlugin.configs['core-web-vitals'],

  // react-hooks — flat config (v7: use configs.flat['recommended-latest'], not top-level)
  reactHooks.configs.flat['recommended-latest'],

  // JS recommended (all files)
  js.configs.recommended,

  // TypeScript ESLint recommended (array — spread into flat config)
  ...tseslint.configs.recommended,

  // Custom TypeScript rules + language options
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // General
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // Relax rules for route handlers and server files
  {
    files: ['app/api/**/*.ts', 'lib/supabase/server.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default config;
