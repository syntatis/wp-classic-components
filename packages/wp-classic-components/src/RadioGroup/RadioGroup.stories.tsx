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
		label: 'Time format',
	},
};

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
	render(args) {
		return (
			<RadioGroup {...args}>
				<Radio value="g:i a">4:18 am</Radio>
				<Radio value="g:i A">4:18 AM</Radio>
				<Radio value="H:i">04:18</Radio>
			</RadioGroup>
		);
	},
};

export const Disabled: Story = {
	parameters: {
		controls: {
			exclude: ['isDisabled'],
		},
	},
	args: {
		isDisabled: true,
	},
	render: Default.render,
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
	render: Default.render,
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
	render: Default.render,
};

export const CheckedDefault: Story = {
	name: 'Checked (default)',
	args: {
		defaultValue: 'g:i a',
	},
	render: Default.render,
};

export const CheckedControlled: Story = {
	name: 'Checked (controlled)',
	args: {
		value: 'g:i a',
	},
	render: Default.render,
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
	render: Default.render,
};

export const WithDescription: Story = {
	args: {
		description: 'The time format will be used when displaying dates.',
	},
	render: Default.render,
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
	render: Default.render,
};

export default meta;
