import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
	title: 'Components/TextArea',
	component: TextArea,
	tags: ['autodocs'],
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

type Story = StoryObj<typeof TextArea>;

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

export const WithDescription: Story = {
	args: {
		description: 'In a few words, explain what this site is about.',
	},
};

export default meta;
