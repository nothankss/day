import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'temp/**',
      'library/**',
      'local/**',
      'profiles/**',
      'build/**',
      'dist/**',
      'coverage/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['assets/core/domain/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                'cc',
                'cc/*',
                '**/presentation/**',
                '**/platform/**',
                '**/services/**',
                '**/modes/**',
                '**/feel/**',
                '**/application/**',
              ],
              message:
                'Domain must remain pure TypeScript and independent of outer layers.',
            },
          ],
        },
      ],
    },
  },
);
