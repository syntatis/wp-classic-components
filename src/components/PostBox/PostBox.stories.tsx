import type { Meta, StoryObj } from '@storybook/react';
import { PostBox } from './PostBox';
import { Button } from '../Button';

const meta: Meta<typeof PostBox> = {
	title: 'Components/PostBox',
	component: PostBox,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: ['title', 'children'],
		},
	},
	argTypes: {
		children: {
			control: 'text',
		},
	},
	args: {
		title: 'Site Health',
		children:
			'Your site has critical issues that should be addressed as soon as possible to improve its performance and security.',
	},
};

type Story = StoryObj<typeof PostBox>;

export const Default: Story = {};

export const Collapsible: Story = {
	args: {
		collapsible: true,
	},
};

export const WithFooter: Story = {
	args: {
		collapsible: true,
		footer: <Button>Save changes</Button>,
	},
};

export default meta;
