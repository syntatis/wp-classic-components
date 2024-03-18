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
	title: 'Components/Dialog',
};

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
	render(props) {
		return (
			<DialogTrigger
				render={() => (
					<Dialog {...props}>
						<form action="" method="get">
							<p>Hello World</p>
							<button>Submit</button>
						</form>
					</Dialog>
				)}
			>
				<Button>Open Dialog</Button>
			</DialogTrigger>
		);
	},
};

export default meta;
