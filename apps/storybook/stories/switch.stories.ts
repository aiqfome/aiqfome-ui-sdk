import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@aiqfome-sdk/ui-lit';

const meta: Meta = {
  title: 'Components/Switch',
  component: 'geraldo-switch',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html` <geraldo-switch>Toggle texto</geraldo-switch> `,
};
