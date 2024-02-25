import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Select } from '../Select';
import { SelectItem } from '../Select/SelectItem';
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

export const WithAdvancedTitle: Story = {
	args: {
		collapsible: true,
		title: (
			<>
				<h2>Site Health</h2> &mdash;{' '}
				<Select name="site">
					<SelectItem>Blog</SelectItem>
					<SelectItem>Shop</SelectItem>
				</Select>
			</>
		),
	},
};

export const WithFooter: Story = {
	args: {
		footer: <Button>Save changes</Button>,
	},
};

export default meta;
