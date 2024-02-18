import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
	argTypes: {
		description: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
	},
	args: {
		label: 'Tagline',
	},
	component: TextArea,
	parameters: {
		controls: {
			include: [
				'label',
				'description',
				'descriptionArea',
				'rows',
				'cols',
				'isCode',
				'isDisabled',
				'isReadOnly',
				'isRequired',
				'onChange',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/TextArea',
};

type Story = StoryObj<typeof TextArea>;

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

export default meta;
