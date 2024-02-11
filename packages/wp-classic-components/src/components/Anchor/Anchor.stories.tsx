import { Icon, wordpress, external } from '@wordpress/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Anchor } from './Anchor';

const meta: Meta<typeof Anchor> = {
	title: 'Components/Anchor',
	component: Anchor,
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

type Story = StoryObj<typeof Anchor>;

export const Default: Story = {};

export const WithPrefix: Story = {
	args: {
		prefix: <Icon icon={wordpress} />,
	},
};

export const WithSuffix: Story = {
	args: {
		suffix: <Icon icon={external} />,
	},
};

export default meta;
