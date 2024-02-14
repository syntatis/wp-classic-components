import { Icon, external } from '@wordpress/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { LinkButton } from './LinkButton';

const meta: Meta<typeof LinkButton> = {
	title: 'Components/LinkButton',
	component: LinkButton,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: [
				'children',
				'excludeFromTabOrder',
				'href',
				'size',
				'target',
				'variant',
				'onFocusChange',
				'onHoverChange',
			],
		},
	},
	argTypes: {
		children: {
			control: {
				type: 'text',
			},
		},
		target: {
			control: {
				type: 'select',
			},
			options: ['_self', '_blank'],
		},
	},
	args: {
		href: 'https://wordpress.org',
		children: 'Go to WordPress',
	},
};

type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {};

export const WithPrefix: Story = {
	args: {
		suffix: <Icon icon={external} />,
	},
};

export const WithSuffix: Story = {
	args: {
		suffix: <Icon icon={external} />,
	},
};

export default meta;
