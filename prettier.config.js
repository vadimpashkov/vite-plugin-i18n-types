/**
 * @see https://prettier.io/docs/configuration/
 * @type {import("prettier").Config}
 */
export default {
	singleQuote: true,
	printWidth: 120,
	useTabs: true,
	tabWidth: 4,
	semi: true,
	trailingComma: 'all',
	overrides: [
		{
			files: ['*.json', '*.md'],
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
};
