import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export const GERALDO_RADIO_SELECT = 'geraldo-radio-select';

@customElement('geraldo-radio')
export class GeraldoRadio extends LitElement {
  @property({ type: String, reflect: true }) value = '';
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) name = '';

  static styles = css`
    :host {
      display: block;
      font-family: var(--geraldo-font-family);
    }
    .row {
      display: flex;
      align-items: flex-start;
      gap: var(--geraldo-space-3);
      cursor: pointer;
      user-select: none;
    }
    :host([disabled]) .row {
      cursor: not-allowed;
      opacity: 0.55;
    }
    input[type='radio'] {
      flex-shrink: 0;
      width: 22px;
      height: 22px;
      margin: 2px 0 0;
      appearance: none;
      box-sizing: border-box;
      border: var(--geraldo-border-width-2) solid var(--geraldo-color-border);
      border-radius: 50%;
      background: var(--geraldo-color-surface);
      cursor: pointer;
      transition:
        border-color 0.12s ease,
        box-shadow 0.12s ease;
    }
    input[type='radio']:focus-visible {
      outline: none;
      box-shadow: var(--geraldo-focus-ring);
    }
    input[type='radio']:checked {
      border-color: var(--geraldo-color-primary-600);
      box-shadow: inset 0 0 0 5px var(--geraldo-color-primary-400);
    }
    input[type='radio']:disabled {
      cursor: not-allowed;
    }
    .slot-label {
      font-size: var(--geraldo-text-body-size);
      line-height: var(--geraldo-text-body-line);
      color: var(--geraldo-color-text);
    }
  `;

  private _onChange(e: Event) {
    e.stopPropagation();
    const input = e.target as HTMLInputElement;
    if (!input.checked) return;
    this.checked = true;
    this.dispatchEvent(
      new CustomEvent(GERALDO_RADIO_SELECT, {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
    this.dispatchEvent(
      new CustomEvent('geraldo-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <label part="root" class="row">
        <input
          part="input"
          type="radio"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${ifDefined(this.name || undefined)}
          value=${this.value}
          @change=${this._onChange}
        />
        <span class="slot-label" part="label"><slot></slot></span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'geraldo-radio': GeraldoRadio;
  }
}
