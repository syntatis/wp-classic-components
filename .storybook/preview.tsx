import React, { useEffect } from 'react';
import { Decorator, Preview } from '@storybook/react';
import './preview.css';

const DEFAULT_THEME = 'light' as const;

const ThemeDecorator: Decorator = (Story, context) => {
	const id = context.id;
  const theme = context.globals?.theme || DEFAULT_THEME;
  const viewMode = context?.viewMode;

  useEffect(() => {
    if (viewMode === 'docs') {
      const selector = `#anchor--${id} .docs-story`;
      document.querySelectorAll(selector).forEach((el) => {
        if (el instanceof HTMLElement) {
          el.classList.add('__wp-core-body__');
        }
      });
    }

    document.documentElement.classList.add('__wp-core-body__');
	}, [theme, viewMode, id]);

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
		actions: {
			argTypesRegex: '^on[A-Z].*',
		},
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
			sort: 'requiredFirst',
    },
    backgrounds: {
      disable: true,
    },
  },
};

export default preview;
