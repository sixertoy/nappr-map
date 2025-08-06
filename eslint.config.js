import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'public/**',
      'coverage/**',
    ],
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
      react: react,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
      'sort-destructure-keys': sortDestructureKeys,
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
  eslintPluginPrettierRecommended,
];
