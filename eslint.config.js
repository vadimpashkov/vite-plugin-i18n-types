import pluginJs from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		name: 'globals',
		ignores: ['node_modules', 'dist', '*.config.{js,ts}', 'package-lock.json'],
	},
	{
		name: 'main',
		files: ['**/*.ts'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: tsParser,
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: import.meta.dirname,
			},
			globals: globals.node,
		},
		plugins: {
			'@typescript-eslint': tsEslint,
			prettier: prettierPlugin,
		},
		rules: {
			...pluginJs.configs.recommended.rules,
			...tsEslint.configs.recommended.rules,
			...prettierConfig.rules,
			'@typescript-eslint/explicit-member-accessibility': [
				'error',
				{ accessibility: 'explicit', overrides: { constructors: 'off' } },
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'prefer-const': 'error',
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'no-restricted-syntax': [
				'error',
				{
					selector: 'TSEnumDeclaration',
					message: 'Using enums is forbidden. Use const as const and ObjectValues<T> instead.',
				},
			],
			'no-console': 'error',
			curly: ['error', 'all'],
			'prettier/prettier': 'error',
		},
	},
	{
		name: 'tests',
		files: ['tests/*.test.ts'],
		rules: {
			'no-console': 'off',
		},
	},
];
