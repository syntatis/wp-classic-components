import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: [
				'children',
				'excludeFromTabOrder',
				'isDisabled',
				'isReadOnly',
				'isSelected',
				'onChange',
				'onFocusChange',
			],
		},
	},
	argTypes: {
		children: {
			control: 'text',
		},
	},
	args: {
		children: 'WordPress should correct invalidly nested XHTML automatically',
	},
};

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const ReadOnly: Story = {
	name: 'ReadOnly',
	args: {
		defaultSelected: true,
		isReadOnly: true,
	},
};

export const SelectedDefault: Story = {
	name: 'Selected (default)',
	args: {
		defaultSelected: true,
	},
};

export const SelectedControlled: Story = {
	name: 'Selected (controlled)',
	args: {
		isSelected: true,
	},
};

export const WithDescription: Story = {
	args: {
		description:
			'When enabled, the editor will attempt to correct invalidly nested XHTML automatically. For example, if you open a `<strong>` tag but forget to close it, the editor will automatically close it for you.',
	},
};

export default meta;
