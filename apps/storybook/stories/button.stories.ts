import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@aiqfome-sdk/ui-lit';

const meta: Meta = {
  title: 'Components/Button',
  component: 'geraldo-button',
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outline', 'ghost'] },
    color: { control: 'select', options: ['primary', 'secondary', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    variant: 'filled',
    color: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: (args) => html`
    <geraldo-button
      variant=${args.variant}
      color=${args.color}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    >
      Continuar
    </geraldo-button>
  `,
};

export const WithIconSlot: Story = {
  render: () => html`
    <geraldo-button>
      <span slot="icon" aria-hidden="true" style="display:inline-flex;width:1.2em;height:1.2em;">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
      </span>
      Com ícone
    </geraldo-button>
  `,
};
