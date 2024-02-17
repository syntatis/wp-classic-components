import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
	title: 'Components/RadioGroup',
	component: RadioGroup,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: [
				'label',
				'description',
				'descriptionArea',
				'orientation',
				'isRequired',
				'isDisabled',
				'isReadOnly',
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
		label: 'For each post in a feed, include',
		children: [
			<Radio key="full-text" value="full-text">
				Full text
			</Radio>,
			<Radio key="excerpt" value="excerpt">
				Excerpt
			</Radio>,
		],
	},
};

type Story = StoryObj<typeof RadioGroup>;

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
		isReadOnly: true,
	},
};

export const Invalid: Story = {
	args: {
		isRequired: true,
		validate(value) {
			if (!value) {
				return 'Please select a time format.';
			}
		},
	},
};

export const CheckedDefault: Story = {
	name: 'Checked (default)',
	args: {
		defaultValue: 'g:i a',
	},
};

export const CheckedControlled: Story = {
	name: 'Checked (controlled)',
	args: {
		value: 'g:i a',
	},
};

export const OrientationHorizontal: Story = {
	name: 'Orientation (horizontal)',
	parameters: {
		controls: {
			exclude: ['orientation'],
		},
	},
	args: {
		orientation: 'horizontal',
		value: 'g:i a',
	},
};

export const WithDescription: Story = {
	args: {
		description: 'The time format will be used when displaying dates.',
	},
};

export const WithDescriptionBeforeInput: Story = {
	name: 'With Description (before-input)',
	parameters: {
		controls: {
			exclude: ['descriptionArea'],
		},
	},
	args: {
		description: 'The time format will be used when displaying dates.',
	},
};

export default meta;
