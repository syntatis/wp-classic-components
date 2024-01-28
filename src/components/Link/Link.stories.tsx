import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
	title: 'Components/Link',
	component: Link,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: [
				'children',
				'href',
				'target',
				'severity',
				'onFocusChange',
				'onHoverChange',
			],
		},
	},
	argTypes: {
		children: {
			control: 'text',
		},
		target: {
			control: 'select',
			options: ['_blank', '_parent', '_self', '_top'],
		},
	},
	args: {
		children: 'WordPress',
		href: 'https://wordpress.org',
	},
};

type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export default meta;
