import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { SelectItem } from './SelectItem';

const meta: Meta<typeof Select> = {
	args: {
		children: [
			<SelectItem key="subcriber" value="subscriber">
				Subscriber
			</SelectItem>,
			<SelectItem key="contributor" value="contributor">
				Contributor
			</SelectItem>,
			<SelectItem key="author" value="author">
				Author
			</SelectItem>,
			<SelectItem key="editor" value="editor">
				Editor
			</SelectItem>,
			<SelectItem key="administrator" value="administrator">
				Administrator
			</SelectItem>,
		],
		label: 'Role',
	},
	component: Select,
	parameters: {
		controls: {
			include: [
				'description',
				'isDisabled',
				'isInvalid',
				'isRequired',
				'label',
				'name',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Select',
};

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Required: Story = {
	args: {
		isInvalid: true,
		isRequired: true,
	},
};

export default meta;
