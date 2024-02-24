import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
	argTypes: {
		children: {
			control: 'text',
		},
		description: {
			control: 'text',
		},
	},
	args: {
		children: 'Show in REST API',
	},
	component: Switch,
	parameters: {
		controls: {
			include: [
				'children',
				'description',
				'isDisabled',
				'isReadOnly',
				'isSelected',
				'onPress',
				'onChange',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Switch',
};

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		isDisabled: true,
		isSelected: true,
	},
	parameters: {
		controls: {
			exclude: ['isDisabled'],
		},
	},
};

export const Selected: Story = {
	args: {
		defaultSelected: true,
	},
	name: 'Selected (default)',
};

export const SelectedControlled: Story = {
	args: {
		isSelected: true,
	},
	name: 'Selected (controlled)',
};

export const ReadOnly: Story = {
	args: {
		defaultSelected: true,
		isReadOnly: true,
	},
	name: 'ReadOnly',
};

export const WithDescription: Story = {
	args: {
		description: 'When enabled it will show post type in REST API.',
	},
};

export default meta;
