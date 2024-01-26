import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
  },
  args: {
    children: 'Submit',
  },
};

type Story = StoryObj<typeof Button>;

/**
 * The default button appears.
 */
export const Default: Story = {};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export default meta;
