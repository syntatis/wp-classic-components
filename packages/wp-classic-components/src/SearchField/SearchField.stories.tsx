import type { Meta, StoryObj } from '@storybook/react';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
	argTypes: {
		description: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
	},
	args: {
		label: 'Search',
	},
	component: SearchField,
	parameters: {
		controls: {
			include: [
				'label',
				'type',
				'description',
				'descriptionArea',
				'isDisabled',
				'isReadOnly',
				'isRequired',
				'onChange',
				'onSubmit',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/SearchField',
};

type Story = StoryObj<typeof SearchField>;

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
		value: 'How to...',
	},
	name: 'ReadOnly',
	parameters: {
		controls: {
			exclude: ['isReadOnly'],
		},
	},
};

export const Required: Story = {
	args: {
		isRequired: true,
	},
	parameters: {
		controls: {
			exclude: ['isRequired'],
		},
	},
};

export const Invalid: Story = {
	args: {
		isRequired: true,
		validate(value) {
			if (!value) {
				return 'Search query is invalid.';
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
		errorMessage: 'An unexpected error occurred.',
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
		defaultValue: 'WooCommerce',
	},
	name: 'Value (default)',
};

export const ValueControlled: Story = {
	args: {
		value: 'WooCommerce',
	},
	name: 'Value (controlled)',
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: 'e.g. How to create a block?',
	},
};

export const WithDescription: Story = {
	args: {
		description: 'Search the post, pages, and other post types.',
	},
};

export const WithDescriptionBeforeInput: Story = {
	args: {
		description: 'Search the post, pages, and other post types.',
		descriptionArea: 'before-input',
	},
	name: 'With Description (before-input)',
	parameters: {
		controls: {
			exclude: ['descriptionArea'],
		},
	},
};

export default meta;
