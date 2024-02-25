import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
	argTypes: {
		description: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
	},
	args: {
		children: [
			<Radio key="full-text" value="full-text">
				Full text
			</Radio>,
			<Radio key="excerpt" value="excerpt">
				Excerpt
			</Radio>,
		],
		label: 'For each post in a feed, include',
	},
	component: RadioGroup,
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
	tags: ['autodocs'],
	title: 'Components/RadioGroup',
};

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const ReadOnly: Story = {
	args: {
		isReadOnly: true,
	},
	name: 'ReadOnly',
};

export const Required: Story = {
	args: {
		isRequired: true,
	},
};

export const Validated: Story = {
	args: {
		validate(value) {
			if (!value) {
				return 'Please select a time format.';
			}
		},
	},
};

export const CheckedDefault: Story = {
	args: {
		defaultValue: 'g:i a',
	},
	name: 'Checked (default)',
};

export const CheckedControlled: Story = {
	args: {
		value: 'g:i a',
	},
	name: 'Checked (controlled)',
};

export const OrientationHorizontal: Story = {
	args: {
		orientation: 'horizontal',
		value: 'g:i a',
	},
	name: 'Orientation (horizontal)',
	parameters: {
		controls: {
			exclude: ['orientation'],
		},
	},
};

export const WithDescription: Story = {
	args: {
		description: 'The time format will be used when displaying dates.',
	},
};

export const WithDescriptionBeforeInput: Story = {
	args: {
		description: 'The time format will be used when displaying dates.',
	},
	name: 'With Description (before-input)',
	parameters: {
		controls: {
			exclude: ['descriptionArea'],
		},
	},
};

export default meta;
