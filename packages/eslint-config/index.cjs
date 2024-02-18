module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:prettier/recommended',
		'plugin:perfectionist/recommended-natural',
	],
	overrides: [
		{
			files: ['*.config.{js,jsx,ts,tsx,mts}', '*.d.{js,jsx,ts,tsx}'],
			rules: {
				'import/no-default-export': 'off',
			},
		},
		{
			files: ['*.test.{js,jsx,ts,tsx,mts}'],
			rules: {
				'@typescript-eslint/ban-ts-comment': 'off',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@stylistic'],
	rules: {
		'@stylistic/max-len': [
			'error',
			{
				// Primary use is to set limit for the comments.
				// @see prettier/prettier.
				code: 100,
				comments: 120,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreUrls: true,
			},
		],
		'@stylistic/padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				next: ['block-like', 'return', 'continue', 'throw'],
				prev: '*',
			},
			{
				blankLine: 'always',
				next: '*',
				prev: ['const', 'let', 'var'],
			},
			{
				blankLine: 'never',
				next: ['const', 'let', 'var'],
				prev: ['const', 'let', 'var'],
			},
			{
				blankLine: 'always',
				next: '*',
				prev: 'directive',
			},
			{
				blankLine: 'never',
				next: 'directive',
				prev: 'directive',
			},
			{
				blankLine: 'always',
				next: 'default',
				prev: '*',
			},
			{
				blankLine: 'never',
				next: 'break',
				prev: '*',
			},
			{
				blankLine: 'never',
				next: 'case',
				prev: 'case',
			},
		],
		'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
		'import/newline-after-import': [
			'error',
			{
				count: 1,
			},
		],
		'import/no-cycle': [
			2,
			{
				maxDepth: 1,
			},
		],
		/**
		 * @see https://notes.webutvikling.org/default-exports/
		 * @see https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/ by Nicholas C. Zakas
		 */
		'import/no-default-export': 'error',
		'import/no-duplicates': [
			'error',
			{
				'prefer-inline': true,
			},
		],
		'prettier/prettier': [
			'error',
			{
				experimentalTernaries: true,
				printWidth: 80,
				singleQuote: true,
				trailingComma: 'es5',
				useTabs: true,
			},
		],
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
			},
		],
		'react/prop-types': 'off',
	},
	settings: {
		'import/resolver': {
			node: true,
			typescript: true,
		},
		react: {
			version: 'detect',
		},
	},
};
