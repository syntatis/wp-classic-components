import { StorybookConfig } from '@storybook/react-vite';
import tsConfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: [
    '../packages/wp-classic-components/src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-styling',
  ],
  core: {},
  docs: {
    autodocs: 'tag',
	},
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
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
	}
};

export default config;
