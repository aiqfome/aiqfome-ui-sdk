import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../src/index';

const meta: Meta = {
  title: 'Components/TextField',
  component: 'geraldo-text-field',
  args: {
    label: 'Título da pergunta',
    description: 'Texto de apoio ou descrição.',
    placeholder: 'Placeholder',
    error: '',
    value: '',
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <geraldo-text-field
      label=${args.label}
      description=${args.description}
      placeholder=${args.placeholder}
      error=${args.error}
      .value=${args.value}
    ></geraldo-text-field>
  `,
};

export const WithError: Story = {
  args: { error: 'Campo obrigatório.' },
  render: (args) => html`
    <geraldo-text-field
      label=${args.label}
      description=${args.description}
      placeholder=${args.placeholder}
      error=${args.error}
    ></geraldo-text-field>
  `,
};
