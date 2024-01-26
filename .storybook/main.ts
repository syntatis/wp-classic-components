import * as path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths'
import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
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
  async viteFinal(config) {
    config.plugins?.push(
      tsconfigPaths({
        projects: [path.resolve(path.dirname(__dirname), 'tsconfig.json')],
      })
    );

    return config;
  },
};

export default config;
