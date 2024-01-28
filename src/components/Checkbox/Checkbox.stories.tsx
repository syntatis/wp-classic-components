import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: ['children', 'onChange', 'onFocusChange'],
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

export default meta;
