import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
	args: {
		children: 'Show in REST API',
	},
	component: Switch,
	parameters: {
		controls: {},
	},
	tags: ['autodocs'],
	title: 'Components/Switch',
};

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export default meta;
