import type { Meta, StoryObj } from '@storybook/react';
import { Notice } from './Notice';

const meta: Meta<typeof Notice> = {
	title: 'Components/Notice',
	component: Notice,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: ['children', 'variant', 'onDismiss'],
		},
	},
	argTypes: {
		children: {
			control: 'text',
		},
	},
	args: {
		children: 'Settings saved.',
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
