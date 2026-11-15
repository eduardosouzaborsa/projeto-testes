import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      // Avisa se houver variáveis declaradas e esquecidas sem uso:
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Desencoraja o uso de 'any' para manter a tipagem estrita do TypeScript:
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**']
  }
];