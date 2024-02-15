import type { Meta, StoryObj } from '@storybook/react';
import { Notice } from './Notice';

const meta: Meta<typeof Notice> = {
	title: 'Components/Notice',
	component: Notice,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: ['children', 'level', 'variant', 'onDismiss'],
		},
	},
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
};

type Story = StoryObj<typeof Notice>;

export const Default: Story = {};

export const Dismissable: Story = {
	args: {
		dismissable: true,
	},
};

export default meta;
