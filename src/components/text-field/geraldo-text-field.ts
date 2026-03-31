import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

let textFieldUid = 0;

@customElement('geraldo-text-field')
export class GeraldoTextField extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) description = '';
  @property({ type: String }) error = '';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) name = '';
  @property({ type: String }) autocomplete = '';
  @property({ type: String }) inputmode = '';
  @property({ type: String }) type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' = 'text';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) readonly = false;

  private readonly _fieldId = `geraldo-tf-${++textFieldUid}`;

  static styles = css`
    :host {
      display: block;
      font-family: var(--geraldo-font-family);
      color: var(--geraldo-color-text);
    }
    label {
      display: flex;
      flex-direction: column;
      gap: var(--geraldo-space-2);
    }
    .label-text {
      font-size: var(--geraldo-text-secondary-size);
      font-weight: var(--geraldo-font-weight-medium);
      line-height: var(--geraldo-text-secondary-line);
    }
    .field {
      box-sizing: border-box;
      width: 100%;
      min-height: 48px;
      padding: var(--geraldo-space-3) var(--geraldo-space-4);
      font: inherit;
      font-size: var(--geraldo-text-body-size);
      line-height: var(--geraldo-text-body-line);
      color: var(--geraldo-color-text);
      background: var(--geraldo-color-surface);
      border: var(--geraldo-border-width-2) solid var(--geraldo-color-border);
      border-radius: var(--geraldo-radius-box-inner);
      outline: none;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }
    .field:hover:not(:disabled) {
      border-color: var(--geraldo-color-neutral-400);
    }
    .field:focus-visible {
      border-color: var(--geraldo-color-info-400);
      box-shadow: var(--geraldo-focus-ring);
    }
    .field:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--geraldo-color-surface-muted);
    }
    .field[data-invalid] {
      border-color: var(--geraldo-color-danger-400);
    }
    .hint {
      font-size: var(--geraldo-text-apoio-size);
      line-height: var(--geraldo-text-apoio-line);
      color: var(--geraldo-color-text-secondary);
    }
    .err {
      font-size: var(--geraldo-text-apoio-size);
      line-height: var(--geraldo-text-apoio-line);
      color: var(--geraldo-color-danger-600);
    }
  `;

  private _onInput(e: Event) {
    const t = e.target as HTMLInputElement;
    this.value = t.value;
    this.dispatchEvent(
      new CustomEvent('geraldo-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onChange(e: Event) {
    const t = e.target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent('geraldo-change', {
        detail: { value: t.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const invalid = Boolean(this.error);
    const id = this._fieldId;
    const errId = `${id}-err`;
    const descId = `${id}-desc`;

    return html`
      <label part="root">
        ${this.label
          ? html`<span class="label-text" part="label">${this.label}</span>`
          : nothing}
        <input
          part="input"
          class="field"
          id=${id}
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
          name=${ifDefined(this.name || undefined)}
          autocomplete=${ifDefined(this.autocomplete || undefined)}
          inputmode=${ifDefined(this.inputmode || undefined)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          ?data-invalid=${invalid}
          aria-invalid=${invalid ? 'true' : 'false'}
          aria-describedby=${ifDefined(
            [this.description && !invalid ? descId : '', invalid ? errId : '']
              .filter(Boolean)
              .join(' ') || undefined,
          )}
          @input=${this._onInput}
          @change=${this._onChange}
        />
        ${this.description && !invalid
          ? html`<span class="hint" id=${descId} part="description">${this.description}</span>`
          : nothing}
        ${invalid
          ? html`<span class="err" id=${errId} part="error" role="alert">${this.error}</span>`
          : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'geraldo-text-field': GeraldoTextField;
  }
}
