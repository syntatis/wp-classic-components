import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import { Button } from '../Button';

const meta: Meta<typeof Box> = {
	title: 'Components/Box',
	component: Box,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: ['title', 'children', 'collapsible'],
		},
	},
	argTypes: {
		title: {
			control: 'text',
		},
		children: {
			control: 'text',
		},
		collapsible: {
			control: 'boolean',
		},
	},
	args: {
		children:
			'Your site has critical issues that should be addressed as soon as possible to improve its performance and security.',
	},
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
