import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../src/index';

const meta: Meta = {
  title: 'Components/Radio',
  component: 'geraldo-radio-group',
};

export default meta;

type Story = StoryObj;

export const Group: Story = {
  render: () => html`
    <geraldo-radio-group name="opt" legend="Escolha uma opção" value="b">
      <geraldo-radio value="a">Opção A</geraldo-radio>
      <geraldo-radio value="b">Opção B</geraldo-radio>
      <geraldo-radio value="c">Opção C</geraldo-radio>
    </geraldo-radio-group>
  `,
};
