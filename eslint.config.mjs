import js from '@eslint/js'; // CommonJS default export (no named exports)

import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // ✅ Base JavaScript rules
  js.configs.recommended, // <-- ✅ this works

  // ✅ Backend (Node.js + TypeScript)
  {
    files: ['backend/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [path.join(__dirname, 'backend/tsconfig.json')],
        tsconfigRootDir: __dirname,
      },
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // ✅ Frontend (React + Vite + TypeScript)
  {
    files: ['frontend/**/*.ts', 'frontend/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [path.join(__dirname, 'frontend/tsconfig.json')],
        tsconfigRootDir: __dirname,
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // ✅ Test files (Jest)
  {
    files: ['**/tests/**/*.test.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [path.join(__dirname, 'backend/tsconfig.json')],
        tsconfigRootDir: __dirname,
      },
      globals: {
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      jest: (await import('eslint-plugin-jest')).default,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...((await import('eslint-plugin-jest')).configs.recommended.rules),
    },
  },

  // ✅ Apply Prettier last
  prettier,
];
