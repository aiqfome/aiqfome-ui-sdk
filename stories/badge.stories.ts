import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../src/index';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'geraldo-badge',
  argTypes: {
    tone: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'pink', 'neutral', 'developer'],
    },
  },
  args: { tone: 'primary' },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html` <geraldo-badge tone=${args.tone}>Novo</geraldo-badge> `,
};
