import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
	title: 'Components/TextField',
	component: TextField,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: [
				'label',
				'type',
				'description',
				'descriptionArea',
				'isCode',
				'isDisabled',
				'isReadOnly',
				'isRequired',
				'onChange',
			],
		},
	},
	argTypes: {
		label: {
			control: 'text',
		},
		description: {
			control: 'text',
		},
	},
	args: {
		label: 'Tagline',
	},
};

type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const Disabled: Story = {
	parameters: {
		controls: {
			exclude: ['isDisabled'],
		},
	},
	args: {
		isDisabled: true,
	},
};

export const ReadOnly: Story = {
	name: 'ReadOnly',
	parameters: {
		controls: {
			exclude: ['isReadOnly'],
		},
	},
	args: {
		value: 'Hello World',
		isReadOnly: true,
	},
};

export const Invalid: Story = {
	parameters: {
		controls: {
			exclude: ['isRequired'],
		},
	},
	args: {
		isRequired: true,
		validate(value) {
			if (!value) {
				return 'This field is required.';
			}
		},
	},
};

export const ValueDefault: Story = {
	name: 'Value (default)',
	args: {
		defaultValue: 'Hello World',
	},
};

export const ValueControlled: Story = {
	name: 'Value (controlled)',
	args: {
		value: 'Hello World',
	},
};

export const WithDescription: Story = {
	args: {
		description: 'In a few words, explain what this site is about.',
	},
};

export default meta;
