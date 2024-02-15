import { Icon, download, upload } from '@wordpress/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: [
				'children',
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
	argTypes: {
		children: {
			control: {
				type: 'text',
			},
		},
	},
	args: {
		children: 'Save changes',
	},
};

type Story = StoryObj<typeof Button>;

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

export const VariantLink: Story = {
	name: 'Variant (link)',
	parameters: {
		controls: {
			exclude: ['variant'],
		},
	},
	args: {
		variant: 'link',
	},
};

export const VariantLinkDanger: Story = {
	name: 'Variant (link-danger)',
	parameters: {
		controls: {
			exclude: ['variant'],
		},
	},
	args: {
		variant: 'link-danger',
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

export const SizeHero: Story = {
	name: 'Size (hero)',
	parameters: {
		controls: {
			exclude: ['size'],
		},
	},
	args: {
		size: 'hero',
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
};

export const WithPrefix: Story = {
	args: {
		children: 'Upload',
		suffix: <Icon icon={upload} />,
	},
};

export const WithSuffix: Story = {
	args: {
		children: 'Download',
		suffix: <Icon icon={download} />,
	},
};

export default meta;
