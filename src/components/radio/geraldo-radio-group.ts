import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GERALDO_RADIO_SELECT, GeraldoRadio } from './geraldo-radio.js';

let radioGroupUid = 0;

@customElement('geraldo-radio-group')
export class GeraldoRadioGroup extends LitElement {
  @property({ type: String, reflect: true }) value = '';
  @property({ type: String, reflect: true }) name = '';
  @property({ type: String }) legend = '';

  private readonly _legendId = `g-legend-${++radioGroupUid}`;

  static styles = css`
    :host {
      display: block;
      font-family: var(--geraldo-font-family);
      color: var(--geraldo-color-text);
    }
    fieldset {
      border: none;
      margin: 0;
      padding: 0;
      min-width: 0;
    }
    legend {
      padding: 0;
      margin-bottom: var(--geraldo-space-3);
      font-size: var(--geraldo-text-secondary-size);
      font-weight: var(--geraldo-font-weight-medium);
      line-height: var(--geraldo-text-secondary-line);
    }
    .stack {
      display: flex;
      flex-direction: column;
      gap: var(--geraldo-space-3);
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(GERALDO_RADIO_SELECT, this._onSelect as EventListener);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(GERALDO_RADIO_SELECT, this._onSelect as EventListener);
  }

  protected firstUpdated(): void {
    this._syncRadios();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('value') || changed.has('name')) {
      this._syncRadios();
    }
  }

  private _onSelect = (e: Event) => {
    const ce = e as CustomEvent<{ value: string }>;
    if (!this.contains(e.target as Node)) return;
    e.stopPropagation();
    const v = ce.detail?.value ?? '';
    this.value = v;
    this._syncRadios();
    this.dispatchEvent(
      new CustomEvent('geraldo-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private _syncRadios() {
    const radios = this.querySelectorAll('geraldo-radio');
    radios.forEach((el) => {
      const r = el as GeraldoRadio;
      r.checked = r.value === this.value;
      if (this.name) r.name = this.name;
    });
  }

  render() {
    return html`
      <fieldset
        part="root"
        role="radiogroup"
        aria-labelledby=${this.legend ? this._legendId : nothing}
      >
        ${this.legend
          ? html`<legend id=${this._legendId} part="legend">${this.legend}</legend>`
          : nothing}
        <div class="stack" part="options">
          <slot @slotchange=${() => this._syncRadios()}></slot>
        </div>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'geraldo-radio-group': GeraldoRadioGroup;
  }
}
