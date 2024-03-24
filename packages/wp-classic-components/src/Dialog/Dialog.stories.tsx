import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Tabs } from '../Tabs';
import { Tab } from '../Tabs/Tab';
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
				portalSelector=".wp-core-ui"
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

export const WithTabs: Story = {
	render(props) {
		return (
			<DialogTrigger
				portalSelector=".wp-core-ui"
				render={() => (
					<Dialog {...props}>
						<Tabs>
							<Tab key="general" title="General">
								<p>
									Contains all the information you need to know about your site
									health.
								</p>
							</Tab>
							<Tab key="test" title="Tests">
								<p>Perform tests to check your site health.</p>
							</Tab>
							<Tab key="other" title="Other">
								<p>
									Contains all the information you need to know about your site
									health.
								</p>
							</Tab>
						</Tabs>
					</Dialog>
				)}
			>
				<Button>Open Dialog</Button>
			</DialogTrigger>
		);
	},
};

export default meta;
