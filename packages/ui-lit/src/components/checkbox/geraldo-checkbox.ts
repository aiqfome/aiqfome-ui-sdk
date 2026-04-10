import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('geraldo-checkbox')
export class GeraldoCheckbox extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) value = 'on';
  @property({ type: String }) name = '';

  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--geraldo-font-family);
      vertical-align: middle;
    }
    .row {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--geraldo-space-3);
      cursor: pointer;
      user-select: none;
    }
    :host([disabled]) .row {
      cursor: not-allowed;
      opacity: 0.55;
    }
    input[type='checkbox'] {
      flex-shrink: 0;
      width: 22px;
      height: 22px;
      margin: 2px 0 0;
      appearance: none;
      box-sizing: border-box;
      border: var(--geraldo-border-width-2) solid var(--geraldo-color-border);
      border-radius: var(--geraldo-radius-element);
      background: var(--geraldo-color-surface);
      cursor: pointer;
      transition:
        border-color 0.12s ease,
        background 0.12s ease;
    }
    input[type='checkbox']:focus-visible {
      outline: none;
      box-shadow: var(--geraldo-focus-ring);
    }
    input[type='checkbox']:checked {
      background: var(--geraldo-color-primary-400);
      border-color: var(--geraldo-color-primary-600);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 10'%3E%3Cpath fill='none' stroke='white' stroke-width='2' d='M1 5l3 3 7-7'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 12px 10px;
    }
    input[type='checkbox']:disabled {
      cursor: not-allowed;
    }
    .slot-label {
      font-size: var(--geraldo-text-body-size);
      line-height: var(--geraldo-text-body-line);
      color: var(--geraldo-color-text);
    }
  `;

  private _onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(
      new CustomEvent('geraldo-change', {
        detail: { checked: this.checked, value: this.value },
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
          type="checkbox"
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
    'geraldo-checkbox': GeraldoCheckbox;
  }
}
