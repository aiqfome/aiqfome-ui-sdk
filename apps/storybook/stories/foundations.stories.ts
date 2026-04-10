import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@aiqfome-sdk/ui-lit';

const meta: Meta = {
  title: 'Foundations/Tokens',
  parameters: {
    docs: { description: { component: 'Cores, espaçamento e tipografia do guia Geraldo (CSS variables).' } },
  },
};

export default meta;

export const Colors: StoryObj = {
  name: 'Cores',
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px;font-family:var(--geraldo-font-family);">
      ${[
        ['primary-400', 'var(--geraldo-color-primary-400)'],
        ['secondary-400', 'var(--geraldo-color-secondary-400)'],
        ['success-400', 'var(--geraldo-color-success-400)'],
        ['warning-400', 'var(--geraldo-color-warning-400)'],
        ['danger-400', 'var(--geraldo-color-danger-400)'],
        ['info-400', 'var(--geraldo-color-info-400)'],
        ['developer-500', 'var(--geraldo-color-developer-500)'],
      ].map(
        ([name, bg]) => html`
          <div style="text-align:center;">
            <div style="height:64px;border-radius:8px;background:${bg};border:1px solid var(--geraldo-color-border);"></div>
            <small>${name}</small>
          </div>
        `,
      )}
    </div>
  `,
};

export const Typography: StoryObj = {
  name: 'Tipografia',
  render: () => html`
    <div style="font-family:var(--geraldo-font-family);display:flex;flex-direction:column;gap:16px;">
      <geraldo-text variant="h1-special" weight="bold">H1 especial bold</geraldo-text>
      <geraldo-text variant="h2-page" weight="bold">H2 página bold</geraldo-text>
      <geraldo-text variant="h3-section" weight="medium">H3 seção medium</geraldo-text>
      <geraldo-text variant="body" weight="regular">Body regular 16px</geraldo-text>
      <geraldo-text variant="secondary" weight="regular">Secundário 14px</geraldo-text>
      <geraldo-text variant="apoio" weight="regular">Apoio 12px</geraldo-text>
    </div>
  `,
};

export const Spacing: StoryObj = {
  name: 'Espaçamento',
  render: () => html`
    <div style="font-family:var(--geraldo-font-family);display:flex;flex-direction:column;gap:8px;">
      ${['1', '3', '5', '7', '8', '12'].map(
        (s) => html`
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="width:24px;">${s}</span>
            <div style="height:8px;width:var(--geraldo-space-${s});background:var(--geraldo-color-primary-400);border-radius:4px;"></div>
          </div>
        `,
      )}
    </div>
  `,
};
