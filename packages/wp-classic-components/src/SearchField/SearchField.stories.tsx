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
		label: 'Search Posts',
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

export const WithPlaceholder: Story = {
	args: {
		placeholder: 'e.g. How to create a block?',
	},
};

export default meta;
