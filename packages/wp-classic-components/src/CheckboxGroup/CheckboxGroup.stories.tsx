import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
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
			<Checkbox key="permalink" value="permalink">
				Permalink
			</Checkbox>,
			<Checkbox key="excerpt" value="excerpt">
				Excerpt
			</Checkbox>,
			<Checkbox key="author" value="author">
				Author
			</Checkbox>,
		],
		label: 'Hide on screen',
	},
	component: CheckboxGroup,
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
	title: 'Components/CheckboxGroup',
};

type Story = StoryObj<typeof CheckboxGroup>;

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
		value: ['permalink', 'excerpt'],
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
			if (value.length === 0) {
				return 'Please select at least one option.';
			}
		},
	},
	parameters: {
		controls: {
			exclude: ['isRequired'],
		},
	},
};

export const CheckedDefault: Story = {
	args: {
		defaultValue: ['permalink'],
	},
	name: 'Checked (default)',
};

export const CheckedControlled: Story = {
	args: {
		value: ['permalink'],
	},
	name: 'Checked (controlled)',
};

export const OrientationHorizontal: Story = {
	args: {
		orientation: 'horizontal',
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
		description: 'Choose which elements to hide on screen.',
	},
};

export const WithDescriptionBeforeInput: Story = {
	args: {
		description: 'Choose which elements to hide on screen.',
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
