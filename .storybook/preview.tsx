import { Decorator, Preview } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react';

import './preview.scss';

const DEFAULT_THEME = 'light' as const;
const ThemeDecorator: Decorator = (Story, context) => {
	const id = context.id;
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
	}, [viewMode, id]);

	return (
		<div className="wp-core-ui">
			<div style={{ maxWidth: '50vw', width: '100%' }}>
				<Story {...context} />
			</div>
		</div>
	);
};
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
		backgrounds: {
			disable: true,
		},
		controls: {
			expanded: true,
			hideNoControlsWarning: true,
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
			sort: 'requiredFirst',
		},
		options: {
			storySort: {
				method: 'alphabetical',
			},
		},
	},
};

export default preview;
