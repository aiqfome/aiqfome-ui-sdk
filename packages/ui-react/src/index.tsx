import * as React from 'react';
import { createComponent } from '@lit/react';
import {
  GeraldoBadge as GeraldoBadgeElement,
  GeraldoButton as GeraldoButtonElement,
  GeraldoCard as GeraldoCardElement,
  GeraldoCheckbox as GeraldoCheckboxElement,
  GeraldoRadio as GeraldoRadioElement,
  GeraldoRadioGroup as GeraldoRadioGroupElement,
  GeraldoSwitch as GeraldoSwitchElement,
  GeraldoText as GeraldoTextElement,
  GeraldoTextField as GeraldoTextFieldElement,
  GERALDO_RADIO_SELECT,
  defineGeraldoUI,
} from '@aiqfome-sdk/ui-lit';

export { defineGeraldoUI };
export { geraldoSpace, geraldoSpaceVar, type GeraldoSpace } from '@aiqfome-sdk/themes';
export type {
  GeraldoBadgeTone,
  GeraldoButtonColor,
  GeraldoButtonSize,
  GeraldoButtonVariant,
  GeraldoCardElevation,
  GeraldoTextVariant,
  GeraldoTextWeight,
} from '@aiqfome-sdk/ui-lit';

/** Call once before rendering React components that use Geraldo custom elements. */
export function setupAiqfomeUI(): void {
  defineGeraldoUI();
}

export const GeraldoButton = createComponent({
  tagName: 'geraldo-button',
  elementClass: GeraldoButtonElement,
  react: React,
});

export const GeraldoText = createComponent({
  tagName: 'geraldo-text',
  elementClass: GeraldoTextElement,
  react: React,
});

export const GeraldoBadge = createComponent({
  tagName: 'geraldo-badge',
  elementClass: GeraldoBadgeElement,
  react: React,
});

export const GeraldoCard = createComponent({
  tagName: 'geraldo-card',
  elementClass: GeraldoCardElement,
  react: React,
});

export const GeraldoTextField = createComponent({
  tagName: 'geraldo-text-field',
  elementClass: GeraldoTextFieldElement,
  react: React,
  events: {
    onGeraldoInput: 'geraldo-input',
    onGeraldoChange: 'geraldo-change',
  },
});

export const GeraldoCheckbox = createComponent({
  tagName: 'geraldo-checkbox',
  elementClass: GeraldoCheckboxElement,
  react: React,
  events: {
    onGeraldoChange: 'geraldo-change',
  },
});

export const GeraldoRadio = createComponent({
  tagName: 'geraldo-radio',
  elementClass: GeraldoRadioElement,
  react: React,
  events: {
    onGeraldoChange: 'geraldo-change',
    onGeraldoRadioSelect: GERALDO_RADIO_SELECT,
  },
});

export const GeraldoRadioGroup = createComponent({
  tagName: 'geraldo-radio-group',
  elementClass: GeraldoRadioGroupElement,
  react: React,
  events: {
    onGeraldoChange: 'geraldo-change',
  },
});

export const GeraldoSwitch = createComponent({
  tagName: 'geraldo-switch',
  elementClass: GeraldoSwitchElement,
  react: React,
  events: {
    onGeraldoChange: 'geraldo-change',
  },
});
