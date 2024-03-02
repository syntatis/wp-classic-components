import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
	args: {
		chidlren: [],
	},
	component: Tabs,
	parameters: {
		controls: {
			include: [],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Tabs',
};

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};

export default meta;
