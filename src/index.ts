/**
 * Geraldo UI — register all custom elements (idempotent).
 * Import `@aiqfome-org/geraldo-ui/tokens.css` once in your app root before components.
 *
 * Icons: use the default slot `icon` on button/badge or project SVGs from
 * [Material Symbols](https://fonts.google.com/icons) or [@mdi/js](https://pictogrammers.com/library/mdi/).
 */

export { GeraldoButton } from './components/button/geraldo-button.js';
export type {
  GeraldoButtonVariant,
  GeraldoButtonColor,
  GeraldoButtonSize,
} from './components/button/geraldo-button.js';

export { GeraldoText } from './components/typography/geraldo-text.js';
export type { GeraldoTextVariant, GeraldoTextWeight } from './components/typography/geraldo-text.js';

export { GeraldoBadge } from './components/badge/geraldo-badge.js';
export type { GeraldoBadgeTone } from './components/badge/geraldo-badge.js';

export { GeraldoCard } from './components/card/geraldo-card.js';
export type { GeraldoCardElevation } from './components/card/geraldo-card.js';

export { GeraldoTextField } from './components/text-field/geraldo-text-field.js';

export { GeraldoCheckbox } from './components/checkbox/geraldo-checkbox.js';

export { GeraldoRadio, GERALDO_RADIO_SELECT } from './components/radio/geraldo-radio.js';
export { GeraldoRadioGroup } from './components/radio/geraldo-radio-group.js';

export { GeraldoSwitch } from './components/switch/geraldo-switch.js';

export { geraldoSpace, geraldoSpaceVar } from './tokens/tokens.js';
export type { GeraldoSpace } from './tokens/tokens.js';

import { GeraldoButton } from './components/button/geraldo-button.js';
import { GeraldoText } from './components/typography/geraldo-text.js';
import { GeraldoBadge } from './components/badge/geraldo-badge.js';
import { GeraldoCard } from './components/card/geraldo-card.js';
import { GeraldoTextField } from './components/text-field/geraldo-text-field.js';
import { GeraldoCheckbox } from './components/checkbox/geraldo-checkbox.js';
import { GeraldoRadio } from './components/radio/geraldo-radio.js';
import { GeraldoRadioGroup } from './components/radio/geraldo-radio-group.js';
import { GeraldoSwitch } from './components/switch/geraldo-switch.js';

const definitions: ReadonlyArray<readonly [string, CustomElementConstructor]> = [
  ['geraldo-button', GeraldoButton],
  ['geraldo-text', GeraldoText],
  ['geraldo-badge', GeraldoBadge],
  ['geraldo-card', GeraldoCard],
  ['geraldo-text-field', GeraldoTextField],
  ['geraldo-checkbox', GeraldoCheckbox],
  ['geraldo-radio', GeraldoRadio],
  ['geraldo-radio-group', GeraldoRadioGroup],
  ['geraldo-switch', GeraldoSwitch],
];

/** Register every Geraldo custom element if not already defined. */
export function defineGeraldoUI(): void {
  for (const [tag, ctor] of definitions) {
    if (!customElements.get(tag)) {
      customElements.define(tag, ctor);
    }
  }
}
