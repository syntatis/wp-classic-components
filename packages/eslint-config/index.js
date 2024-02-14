module.exports = {
	env: {
		es6: true,
		node: true,
		browser: true,
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@stylistic'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:prettier/recommended',
		'plugin:storybook/recommended',
	],
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			typescript: true,
			node: true,
		},
	},
	rules: {
		'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
		'@stylistic/max-len': [
			'error',
			{
				// Primary use is to set limit for the comments.
				// @see prettier/prettier.
				code: 90,
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
				prev: '*',
				next: ['block-like', 'return', 'continue'],
			},
			{
				blankLine: 'always',
				prev: ['const', 'let', 'var'],
				next: '*',
			},
			{
				blankLine: 'any',
				prev: ['const', 'let', 'var'],
				next: ['const', 'let', 'var'],
			},
			{
				blankLine: 'always',
				prev: 'directive',
				next: '*',
			},
			{
				blankLine: 'any',
				prev: 'directive',
				next: 'directive',
			},
			{
				blankLine: 'always',
				prev: ['case', 'default'],
				next: '*',
			},
		],
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
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					['type', 'object'],
					['parent', 'sibling', 'index'],
				],
				alphabetize: {
					order: 'asc',
					orderImportKind: 'asc',
				},
				'newlines-between': 'never',
			},
		],
		'prettier/prettier': [
			'error',
			{
				printWidth: 80,
				singleQuote: true,
				trailingComma: 'es5',
				useTabs: true,
				experimentalTernaries: true,
			},
		],
		'react/prop-types': 'off',
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
			},
		],
	},
	overrides: [
		{
			files: [
				'*.config.{js,jsx,ts,tsx,mts}',
				'*.d.{js,jsx,ts,tsx}',
				'*.stories.{js,jsx,ts,tsx}',
				'*.stories.{js,jsx,ts,tsx}',
			],
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
};
