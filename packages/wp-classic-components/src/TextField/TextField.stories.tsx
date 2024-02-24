import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
	argTypes: {
		description: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
	},
	args: {
		label: 'Site Name',
	},
	component: TextField,
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
	tags: ['autodocs'],
	title: 'Components/TextField',
};

type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
	parameters: {
		controls: {
			exclude: ['isDisabled'],
		},
	},
};

export const ReadOnly: Story = {
	args: {
		isReadOnly: true,
		value: 'Hello World',
	},
	name: 'ReadOnly',
	parameters: {
		controls: {
			exclude: ['isReadOnly'],
		},
	},
};

export const Invalid: Story = {
	args: {
		isRequired: true,
		validate(value) {
			if (!value) {
				return 'This field is required.';
			}
		},
	},
	parameters: {
		controls: {
			exclude: ['isRequired'],
		},
	},
};

export const InvalidControlled: Story = {
	args: {
		isInvalid: true,
	},
	name: 'Invalid (controlled)',
	parameters: {
		controls: {
			exclude: ['isInvalid'],
		},
	},
};

export const ValueDefault: Story = {
	args: {
		defaultValue: 'Hello World',
	},
	name: 'Value (default)',
};

export const ValueControlled: Story = {
	args: {
		value: 'Hello World',
	},
	name: 'Value (controlled)',
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: 'e.g. WordPress',
	},
};

export const WithDescription: Story = {
	args: {
		description: 'In a few words, explain what this site is about.',
	},
};

export const WithDescriptionBeforeInput: Story = {
	args: {
		description: 'In a few words, explain what this site is about.',
		descriptionArea: 'before-input',
	},
	name: 'With Description (before-input)',
	parameters: {
		controls: {
			exclude: ['descriptionArea'],
		},
	},
};

export const WithErrorMessageControlled: Story = {
	args: {
		errorMessage: 'An unexpected error occurred!',
	},
	name: 'With Error Message (controlled)',
};

export default meta;
