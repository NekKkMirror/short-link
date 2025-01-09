import globals from 'globals'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import vuetifyPlugin from 'eslint-plugin-vuetify'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  {
    ignores: ['node_modules', 'dist', '*.log', '*.d.ts'],
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      vue,
      prettier,
      vuetify: vuetifyPlugin,
    },
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'warn',
      'no-debugger': 'warn',
      'vue/no-unused-components': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'error',
      'prettier/prettier': 'error',

      'vuetify/no-deprecated-classes': 'error',
      'vuetify/grid-unknown-attributes': 'error',
    },
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      prettier,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          trailingComma: 'all',
        },
      ],
    },
  },
]
