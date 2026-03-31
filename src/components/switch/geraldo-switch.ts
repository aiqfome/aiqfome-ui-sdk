import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('geraldo-switch')
export class GeraldoSwitch extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--geraldo-font-family);
      vertical-align: middle;
    }
    .row {
      display: inline-flex;
      align-items: center;
      gap: var(--geraldo-space-3);
      cursor: pointer;
      user-select: none;
    }
    :host([disabled]) .row {
      cursor: not-allowed;
      opacity: 0.55;
    }
    .track {
      position: relative;
      width: 48px;
      height: 28px;
      flex-shrink: 0;
      border-radius: var(--geraldo-radius-button);
      background: var(--geraldo-color-neutral-300);
      border: var(--geraldo-border-width-2) solid var(--geraldo-color-border);
      transition:
        background 0.18s ease,
        border-color 0.18s ease;
    }
    :host([checked]) .track {
      background: var(--geraldo-color-primary-400);
      border-color: var(--geraldo-color-primary-600);
    }
    .thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--geraldo-color-surface);
      box-shadow: var(--geraldo-shadow-low);
      transition: transform 0.18s ease;
    }
    :host([checked]) .thumb {
      transform: translateX(20px);
    }
    .track:focus-visible {
      outline: none;
      box-shadow: var(--geraldo-focus-ring);
    }
    .slot-label {
      font-size: var(--geraldo-text-body-size);
      line-height: var(--geraldo-text-body-line);
      color: var(--geraldo-color-text);
    }
  `;

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('geraldo-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._toggle();
    }
  }

  render() {
    return html`
      <div part="root" class="row">
        <div
          part="track"
          class="track"
          role="switch"
          tabindex=${this.disabled ? -1 : 0}
          aria-checked=${this.checked ? 'true' : 'false'}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          @click=${() => this._toggle()}
          @keydown=${this._onKeydown}
        >
          <span class="thumb" part="thumb" aria-hidden="true"></span>
        </div>
        <span class="slot-label" part="label"><slot></slot></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'geraldo-switch': GeraldoSwitch;
  }
}
