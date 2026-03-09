import js from '@eslint/js';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const config = tseslint.config(
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
    ],
  },

  // Next.js recommended rules
  ...compat.extends('next/core-web-vitals'),

  // Base JS rules
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

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
  }
);

export default config;
