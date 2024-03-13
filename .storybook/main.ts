/* eslint-disable @typescript-eslint/no-explicit-any */
import { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';
import tsConfigPaths from 'vite-tsconfig-paths';

function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
	addons: [
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-interactions'),
	],
	core: {},
	docs: {
		autodocs: 'tag',
	},
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
	stories: ['../packages/wp-classic-components/src/**/*.stories.@(ts|tsx)'],
	typescript: {
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			compilerOptions: {
				allowSyntheticDefaultImports: false,
				esModuleInterop: false,
			},
			propFilter: () => true,
		},
	},
	viteFinal: (config) => {
		config.plugins?.push(tsConfigPaths());

		return config;
	},
};

export default config;
