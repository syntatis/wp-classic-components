import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from '../Checkbox/Checkbox';

const meta: Meta<typeof CheckboxGroup> = {
	title: 'Components/CheckboxGroup',
	component: CheckboxGroup,
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
		label: 'Hide on screen',
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
	},
};

type Story = StoryObj<typeof CheckboxGroup>;

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
		value: ['permalink', 'excerpt'],
	},
};

export const Required: Story = {
	parameters: {
		controls: {
			exclude: ['isRequired'],
		},
	},
	args: {
		isRequired: true,
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
			if (value.length === 0) {
				return 'Please select at least one option.';
			}
		},
	},
};

export const CheckedDefault: Story = {
	name: 'Checked (default)',
	args: {
		defaultValue: ['permalink'],
	},
};

export const CheckedControlled: Story = {
	name: 'Checked (controlled)',
	args: {
		value: ['permalink'],
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
	},
};

export const WithDescription: Story = {
	args: {
		description: 'Choose which elements to hide on screen.',
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
		descriptionArea: 'before-input',
		description: 'Choose which elements to hide on screen.',
	},
};

export default meta;
