import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../src/index';

const meta: Meta = {
  title: 'Components/Text',
  component: 'geraldo-text',
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1-special', 'h2-page', 'h3-section', 'h4-paragraph', 'body', 'secondary', 'apoio'],
    },
    weight: { control: 'select', options: ['regular', 'medium', 'bold'] },
  },
  args: { variant: 'body', weight: 'regular' },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <geraldo-text variant=${args.variant} weight=${args.weight}>Conteúdo de exemplo</geraldo-text>
  `,
};
