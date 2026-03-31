import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type GeraldoCardElevation = 'none' | 'low' | 'mid' | 'high';

@customElement('geraldo-card')
export class GeraldoCard extends LitElement {
  /** outer = 16px (guide), inner = 12px */
  @property({ type: String }) radius: 'outer' | 'inner' | 'badge' = 'outer';
  @property({ type: String }) elevation: GeraldoCardElevation = 'mid';

  static styles = css`
    :host {
      display: block;
      font-family: var(--geraldo-font-family);
      color: var(--geraldo-color-text);
    }
    article {
      box-sizing: border-box;
      background: var(--geraldo-color-surface);
      border: var(--geraldo-border-width-1) solid var(--geraldo-color-border);
      padding: var(--geraldo-space-5);
    }
    :host([radius='outer']) article {
      border-radius: var(--geraldo-radius-box-outer);
    }
    :host([radius='inner']) article {
      border-radius: var(--geraldo-radius-box-inner);
    }
    :host([radius='badge']) article {
      border-radius: var(--geraldo-radius-badge);
    }
    :host([elevation='none']) article {
      box-shadow: none;
    }
    :host([elevation='low']) article {
      box-shadow: var(--geraldo-shadow-low);
    }
    :host([elevation='mid']) article {
      box-shadow: var(--geraldo-shadow-mid);
    }
    :host([elevation='high']) article {
      box-shadow: var(--geraldo-shadow-high);
    }
  `;

  render() {
    return html`
      <article part="card">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'geraldo-card': GeraldoCard;
  }
}
