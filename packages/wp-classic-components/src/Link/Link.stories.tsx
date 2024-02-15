import { Icon, wordpress, external } from '@wordpress/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
	title: 'Components/Link',
	component: Link,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: ['children', 'href', 'target', 'onFocusChange', 'onHoverChange'],
		},
	},
	argTypes: {
		children: {
			control: 'text',
		},
		target: {
			control: 'select',
			options: ['_blank', '_parent', '_self', '_top'],
		},
	},
	args: {
		children: 'WordPress',
		href: 'https://wordpress.org',
	},
};

type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const VariantDanger: Story = {
	name: 'Variant (danger)',
	args: {
		variant: 'danger',
	},
};

export const VariantWarning: Story = {
	name: 'Variant (warning)',
	args: {
		variant: 'warning',
	},
};

export const WithPrefix: Story = {
	args: {
		prefix: <Icon icon={wordpress} />,
	},
};

export const WithSuffix: Story = {
	args: {
		suffix: <Icon icon={external} />,
	},
};

export default meta;
