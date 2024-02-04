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
	},
};

type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
	render(args) {
		return (
			<CheckboxGroup {...args}>
				<Checkbox value="permalink">Permalink</Checkbox>
				<Checkbox value="excerpt">Excerpt</Checkbox>
				<Checkbox value="discussion">Discussion</Checkbox>
			</CheckboxGroup>
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
		value: ['permalink', 'excerpt'],
	},
	render: Default.render,
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
	render: Default.render,
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
	render: Default.render,
};

export const CheckedDefault: Story = {
	name: 'Checked (default)',
	args: {
		defaultValue: ['permalink'],
	},
	render: Default.render,
};

export const CheckedControlled: Story = {
	name: 'Checked (controlled)',
	args: {
		value: ['permalink'],
	},
	render: Default.render,
};

export const WithDescription: Story = {
	args: {
		description: 'Choose which elements to hide on screen.',
	},
	render: Default.render,
};

export default meta;
