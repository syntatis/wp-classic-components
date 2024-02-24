import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { SelectItem } from './SelectItem';

const meta: Meta<typeof Select> = {
	argTypes: {
		description: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
		name: {
			control: 'text',
		},
	},
	args: {
		label: 'Role',
	},
	component: Select,
	parameters: {
		controls: {
			include: [
				'description',
				'isDisabled',
				'isInvalid',
				'isRequired',
				'label',
				'name',
				'onSelectionChange',
				'onFocusChange',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Select',
};

type Story = StoryObj<typeof Select>;

export const Default: Story = {
	render(props) {
		return (
			<Select {...props}>
				<SelectItem>— Select —</SelectItem>
				<SelectItem>Subscriber</SelectItem>
				<SelectItem>Contributor</SelectItem>
				<SelectItem>Author</SelectItem>
				<SelectItem>Editor</SelectItem>
				<SelectItem>Administrator</SelectItem>
			</Select>
		);
	},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
	render: Default.render,
};

export const Required: Story = {
	args: {
		isRequired: true,
	},
	render: Default.render,
};

export const Invalid: Story = {
	args: {
		validate(value) {
			if (!value || value === '— Select —') {
				return 'Please select a role.';
			}
		},
	},
	render: Default.render,
};

export const InvalidControlled: Story = {
	args: {
		isInvalid: true,
	},
	name: 'Invalid (controlled)',
	render: Default.render,
};

export const Selected: Story = {
	args: {
		selectedItem: 'Author',
	},
	render: Default.render,
};

export default meta;
