import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
	title: 'Components/CheckboxGroup',
	component: CheckboxGroup,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: ['label', 'description'],
		},
	},
	argTypes: {
		children: {
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

export default meta;
