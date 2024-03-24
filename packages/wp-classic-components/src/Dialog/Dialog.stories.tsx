import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Dialog } from './Dialog';
import { DialogTrigger } from './DialogTrigger';

const meta: Meta<typeof Dialog> = {
	args: {
		title: 'Dialog',
	},
	component: Dialog,
	parameters: {
		controls: {
			include: ['title', 'maxWidth', 'maxHeight'],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Dialog',
};

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
	render(props) {
		return (
			<DialogTrigger
				render={() => (
					<Dialog {...props}>
						<div style={{ height: '100%', padding: 20, width: '100%' }}>
							<p>Hello World</p>
						</div>
					</Dialog>
				)}
			>
				<Button>Open Dialog</Button>
			</DialogTrigger>
		);
	},
};

export default meta;
