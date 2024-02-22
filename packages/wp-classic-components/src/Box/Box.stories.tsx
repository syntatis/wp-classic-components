import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
	argTypes: {
		children: {
			control: 'text',
		},
		collapsible: {
			control: 'boolean',
		},
		title: {
			control: 'text',
		},
	},
	args: {
		children:
			'Your site has critical issues that should be addressed as soon as possible to improve its performance and security.',
	},
	component: Box,
	parameters: {
		controls: {
			include: ['title', 'children', 'collapsible'],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Box',
};

type Story = StoryObj<typeof Box>;

export const Default: Story = {};

export const Collapsible: Story = {
	args: {
		collapsible: true,
	},
};

export const WithTitle: Story = {
	args: {
		title: 'Site Health',
	},
};

export const WithFooter: Story = {
	args: {
		footer: <Button>Save changes</Button>,
	},
};

export default meta;
