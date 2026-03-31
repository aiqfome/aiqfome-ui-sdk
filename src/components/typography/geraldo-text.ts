import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Variants align with the style guide naming.
 * Weight: bold | medium | regular — combined with variant for correct size/line-height.
 */
export type GeraldoTextVariant =
  | 'h1-special'
  | 'h2-page'
  | 'h3-section'
  | 'h4-paragraph'
  | 'body'
  | 'secondary'
  | 'apoio';

export type GeraldoTextWeight = 'bold' | 'medium' | 'regular';

@customElement('geraldo-text')
export class GeraldoText extends LitElement {
  @property({ type: String }) variant: GeraldoTextVariant = 'body';
  @property({ type: String }) weight: GeraldoTextWeight = 'regular';
  /** Semantic tag override: h1 | h2 | h3 | h4 | p | span */
  @property({ type: String }) as: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | '' = '';

  static styles = css`
    :host {
      display: block;
      font-family: var(--geraldo-font-family);
      color: var(--geraldo-color-text);
    }
    :host([inline]) {
      display: inline;
    }
    .root {
      margin: 0;
    }
    .h1-special {
      font-size: var(--geraldo-text-h1-size);
      line-height: var(--geraldo-text-h1-line);
    }
    .h2-page {
      font-size: var(--geraldo-text-h2-size);
      line-height: var(--geraldo-text-h2-line);
    }
    .h3-section {
      font-size: var(--geraldo-text-h3-size);
      line-height: var(--geraldo-text-h3-line);
    }
    .h4-paragraph {
      font-size: var(--geraldo-text-h4-size);
      line-height: var(--geraldo-text-h4-line);
    }
    .body {
      font-size: var(--geraldo-text-body-size);
      line-height: var(--geraldo-text-body-line);
    }
    .secondary {
      font-size: var(--geraldo-text-secondary-size);
      line-height: var(--geraldo-text-secondary-line);
      color: var(--geraldo-color-text-secondary);
    }
    .apoio {
      font-size: var(--geraldo-text-apoio-size);
      line-height: var(--geraldo-text-apoio-line);
      color: var(--geraldo-color-text-secondary);
    }
    .w-regular {
      font-weight: var(--geraldo-font-weight-regular);
    }
    .w-medium {
      font-weight: var(--geraldo-font-weight-medium);
    }
    .w-bold {
      font-weight: var(--geraldo-font-weight-bold);
    }
  `;

  private _defaultTag(): 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' {
    switch (this.variant) {
      case 'h1-special':
        return 'h1';
      case 'h2-page':
        return 'h2';
      case 'h3-section':
        return 'h3';
      case 'h4-paragraph':
        return 'h4';
      default:
        return 'p';
    }
  }

  render() {
    const tag = this.as || this._defaultTag();
    const v = this.variant;
    const w = this.weight;
    const cls = classMap({
      root: true,
      [v]: true,
      'w-regular': w === 'regular',
      'w-medium': w === 'medium',
      'w-bold': w === 'bold',
    });
    switch (tag) {
      case 'h1':
        return html`<h1 part="text" class=${cls}><slot></slot></h1>`;
      case 'h2':
        return html`<h2 part="text" class=${cls}><slot></slot></h2>`;
      case 'h3':
        return html`<h3 part="text" class=${cls}><slot></slot></h3>`;
      case 'h4':
        return html`<h4 part="text" class=${cls}><slot></slot></h4>`;
      case 'span':
        return html`<span part="text" class=${cls}><slot></slot></span>`;
      default:
        return html`<p part="text" class=${cls}><slot></slot></p>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'geraldo-text': GeraldoText;
  }
}
