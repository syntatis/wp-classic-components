import { Icon, download, upload } from '@wordpress/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      include: ['children', 'isDisabled', 'type', 'variant', 'onPress', 'onHoverChange', 'onFocusChange'],
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
    children: 'Submit',
    type: 'button',
    variant: 'primary',
  },
};

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

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
