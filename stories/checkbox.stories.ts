import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../src/index';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'geraldo-checkbox',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html` <geraldo-checkbox>Checkbox texto</geraldo-checkbox> `,
};
