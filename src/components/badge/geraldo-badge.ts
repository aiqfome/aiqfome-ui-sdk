import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type GeraldoBadgeTone =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'pink'
  | 'neutral'
  | 'developer';

@customElement('geraldo-badge')
export class GeraldoBadge extends LitElement {
  @property({ type: String }) tone: GeraldoBadgeTone = 'primary';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      font-family: var(--geraldo-font-family);
      vertical-align: middle;
    }
    span {
      display: inline-flex;
      align-items: center;
      gap: var(--geraldo-space-2);
      padding: var(--geraldo-space-1) var(--geraldo-space-3);
      font-size: var(--geraldo-text-apoio-size);
      font-weight: var(--geraldo-font-weight-medium);
      line-height: 1.2;
      border-radius: var(--geraldo-radius-badge);
      border: var(--geraldo-border-width-1) solid transparent;
      box-shadow: var(--geraldo-shadow-low);
    }
    :host([tone='primary']) span {
      background: var(--geraldo-color-primary-bg);
      color: var(--geraldo-color-primary-900);
      border-color: var(--geraldo-color-primary-400);
    }
    :host([tone='secondary']) span {
      background: var(--geraldo-color-secondary-bg);
      color: var(--geraldo-color-secondary-900);
      border-color: var(--geraldo-color-secondary-400);
    }
    :host([tone='success']) span {
      background: var(--geraldo-color-success-bg);
      color: var(--geraldo-color-success-900);
      border-color: var(--geraldo-color-success-400);
    }
    :host([tone='warning']) span {
      background: var(--geraldo-color-warning-bg);
      color: var(--geraldo-color-warning-900);
      border-color: var(--geraldo-color-warning-400);
    }
    :host([tone='danger']) span {
      background: var(--geraldo-color-danger-bg);
      color: var(--geraldo-color-danger-900);
      border-color: var(--geraldo-color-danger-400);
    }
    :host([tone='info']) span {
      background: var(--geraldo-color-info-bg);
      color: var(--geraldo-color-info-900);
      border-color: var(--geraldo-color-info-400);
    }
    :host([tone='pink']) span {
      background: var(--geraldo-color-pink-bg);
      color: var(--geraldo-color-pink-900);
      border-color: var(--geraldo-color-pink-400);
    }
    :host([tone='neutral']) span {
      background: var(--geraldo-color-surface-muted);
      color: var(--geraldo-color-text);
      border-color: var(--geraldo-color-border);
    }
    :host([tone='developer']) span {
      background: var(--geraldo-color-developer-bg);
      color: var(--geraldo-color-developer-700);
      border-color: var(--geraldo-color-developer-500);
    }
  `;

  render() {
    return html`
      <span part="badge">
        <slot name="icon"></slot>
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'geraldo-badge': GeraldoBadge;
  }
}
