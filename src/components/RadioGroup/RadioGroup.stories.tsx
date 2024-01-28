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
		defaultValue: 'g:i a',
	},
};

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
	args: {
		defaultValue: 'g:i a',
	},
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

export default meta;
