import React from 'react';
import { Decorator, Preview } from '@storybook/react';
import './preview.css';

const DEFAULT_THEME = 'light' as const;

const ThemeDecorator: Decorator = (Story, context) => {
	return (
    <div className="wp-core-ui">
      <Story {...context} />
		</div>
	);
}

const preview: Preview = {
  decorators: [ThemeDecorator],
  globalTypes: {
    theme: {
      defaultValue: DEFAULT_THEME,
    },
  },
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    controls: {
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
    backgrounds: {
      disable: true,
    },
  },
};

export default preview;
