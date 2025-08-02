import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.min.js',
      '.next/**',
      'out/**',
      'public/**',
      '*.config.js',
      '*.config.ts',
      '.eslintrc.*',
      'vite.config.*',
      'vitest.config.*',
      'jest.config.*',
      'tailwind.config.*',
      'postcss.config.*',
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...typescript.configs['recommended-requiring-type-checking'].rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/no-unsafe-return': 1,
      'import/prefer-default-export': 0,
      'react/button-has-type': 0,
      'react/display-name': 2,
      'react/jsx-fragments': [2, 'element'],
      'react/jsx-sort-props': [
        2,
        {
          callbacksLast: true,
          reservedFirst: true,
          shorthandFirst: true,
        },
      ],
      'react/react-in-jsx-scope': 0,
      'simple-import-sort/exports': 2,
      'simple-import-sort/imports': 1,
      'sort-keys-fix/sort-keys-fix': 2,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettier,
];
