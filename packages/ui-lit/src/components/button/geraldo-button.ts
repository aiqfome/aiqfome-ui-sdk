import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type GeraldoButtonVariant = 'filled' | 'outline' | 'ghost';
export type GeraldoButtonColor = 'primary' | 'secondary' | 'danger';
export type GeraldoButtonSize = 'sm' | 'md' | 'lg';

@customElement('geraldo-button')
export class GeraldoButton extends LitElement {
  @property({ type: String, reflect: true }) variant: GeraldoButtonVariant = 'filled';
  @property({ type: String, reflect: true }) color: GeraldoButtonColor = 'primary';
  @property({ type: String, reflect: true }) size: GeraldoButtonSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';

  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--geraldo-font-family);
      vertical-align: middle;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.55;
    }
    button {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--geraldo-space-2);
      width: 100%;
      min-height: 44px;
      padding: 0 var(--geraldo-space-5);
      font-family: inherit;
      font-weight: var(--geraldo-font-weight-medium);
      font-size: var(--geraldo-text-body-size);
      line-height: 1.2;
      border-radius: var(--geraldo-radius-button);
      cursor: pointer;
      transition:
        background 0.15s ease,
        color 0.15s ease,
        box-shadow 0.15s ease,
        border-color 0.15s ease;
    }
    button:focus-visible {
      outline: none;
      box-shadow: var(--geraldo-focus-ring);
    }
    :host([size='sm']) button {
      min-height: 36px;
      padding: 0 var(--geraldo-space-4);
      font-size: var(--geraldo-text-secondary-size);
      border-radius: var(--geraldo-radius-box-inner);
    }
    :host([size='lg']) button {
      min-height: 52px;
      padding: 0 var(--geraldo-space-7);
      font-size: var(--geraldo-text-body-size);
    }
    /* Filled */
    :host([variant='filled'][color='primary']) button {
      background: var(--geraldo-color-primary-400);
      color: var(--geraldo-color-neutral-0);
      border: var(--geraldo-border-width-2) solid transparent;
      box-shadow: var(--geraldo-shadow-high);
    }
    :host([variant='filled'][color='primary']) button:hover {
      background: var(--geraldo-color-primary-600);
    }
    :host([variant='filled'][color='secondary']) button {
      background: var(--geraldo-color-secondary-400);
      color: var(--geraldo-color-neutral-0);
      border: var(--geraldo-border-width-2) solid transparent;
      box-shadow: var(--geraldo-shadow-mid);
    }
    :host([variant='filled'][color='secondary']) button:hover {
      background: var(--geraldo-color-secondary-600);
    }
    :host([variant='filled'][color='danger']) button {
      background: var(--geraldo-color-danger-400);
      color: var(--geraldo-color-neutral-0);
      border: var(--geraldo-border-width-2) solid transparent;
      box-shadow: var(--geraldo-shadow-mid);
    }
    :host([variant='filled'][color='danger']) button:hover {
      background: var(--geraldo-color-danger-600);
    }
    /* Outline */
    :host([variant='outline'][color='primary']) button {
      background: transparent;
      color: var(--geraldo-color-primary-600);
      border: var(--geraldo-border-width-2) solid var(--geraldo-color-primary-400);
    }
    :host([variant='outline'][color='secondary']) button {
      background: transparent;
      color: var(--geraldo-color-secondary-600);
      border: var(--geraldo-border-width-2) solid var(--geraldo-color-secondary-400);
    }
    :host([variant='outline'][color='danger']) button {
      background: transparent;
      color: var(--geraldo-color-danger-600);
      border: var(--geraldo-border-width-2) solid var(--geraldo-color-danger-400);
    }
    /* Ghost */
    :host([variant='ghost']) button {
      background: transparent;
      color: var(--geraldo-color-text);
      border: var(--geraldo-border-width-2) solid transparent;
    }
    :host([variant='ghost']) button:hover {
      background: var(--geraldo-color-surface-muted);
    }
    .spinner {
      width: 1.1em;
      height: 1.1em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: g-spin 0.7s linear infinite;
    }
    @keyframes g-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  private _onClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  render() {
    const classes = { loading: this.loading };
    return html`
      <button
        part="button"
        type=${this.type}
        class=${classMap(classes)}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading ? 'true' : 'false'}
        @click=${this._onClick}
      >
        ${this.loading ? html`<span class="spinner" part="spinner" aria-hidden="true"></span>` : nothing}
        <slot name="icon"></slot>
        <span part="label"><slot></slot></span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'geraldo-button': GeraldoButton;
  }
}
