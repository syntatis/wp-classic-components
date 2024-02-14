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
				'size',
				'variant',
				'excludeFromTabOrder',
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
	},
	args: {
		href: 'https://wordpress.org',
		children: 'Go to WordPress',
	},
};

type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {};

export default meta;
