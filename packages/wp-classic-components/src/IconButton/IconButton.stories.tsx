import { Icon, download } from '@wordpress/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
	title: 'Components/IconButton',
	component: IconButton,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: [
				'aria-label',
				'size',
				'variant',
				'type',
				'isDisabled',
				'excludeFromTabOrder',
				'onPress',
				'onHoverChange',
				'onFocusChange',
			],
		},
	},
	args: {
		children: <Icon icon={download} />,
		'aria-label': 'Download',
	},
};

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const VariantSecondary: Story = {
	name: 'Variant (secondary)',
	parameters: {
		controls: {
			exclude: ['variant'],
		},
	},
	args: {
		variant: 'secondary',
	},
};

export const SizeSmall: Story = {
	name: 'Size (small)',
	parameters: {
		controls: {
			exclude: ['size'],
		},
	},
	args: {
		size: 'small',
	},
};

export const SizeLarge: Story = {
	name: 'Size (large)',
	parameters: {
		controls: {
			exclude: ['size'],
		},
	},
	args: {
		size: 'large',
	},
};

export default meta;
