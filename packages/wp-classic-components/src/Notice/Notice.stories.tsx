import type { Meta, StoryObj } from '@storybook/react';
import { Notice } from './Notice';

const meta: Meta<typeof Notice> = {
	argTypes: {
		children: {
			control: 'text',
		},
	},
	args: {
		children: 'Settings saved.',
		level: 'info',
		variant: 'default',
	},
	component: Notice,
	parameters: {
		controls: {
			include: ['children', 'level', 'variant', 'onDismiss'],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Notice',
};

type Story = StoryObj<typeof Notice>;

export const Default: Story = {};

export const Dismissable: Story = {
	args: {
		dismissable: true,
	},
};

export default meta;
