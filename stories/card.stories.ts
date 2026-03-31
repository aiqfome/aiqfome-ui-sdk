import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../src/index';

const meta: Meta = {
  title: 'Components/Card',
  component: 'geraldo-card',
  argTypes: {
    radius: { control: 'select', options: ['outer', 'inner', 'badge'] },
    elevation: { control: 'select', options: ['none', 'low', 'mid', 'high'] },
  },
  args: { radius: 'outer', elevation: 'mid' },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <geraldo-card radius=${args.radius} elevation=${args.elevation} style="max-width:360px;">
      <geraldo-text slot="header" variant="h4-paragraph" weight="bold">Título do card</geraldo-text>
      <geraldo-text variant="body" weight="regular">Descrição curta usando tokens Geraldo.</geraldo-text>
      <div slot="footer" style="margin-top:16px;">
        <geraldo-button size="sm">Ação</geraldo-button>
      </div>
    </geraldo-card>
  `,
};
