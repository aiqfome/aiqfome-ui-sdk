import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import {
  buildGeraldoOAuthRedirectUri,
  buildMagaluAuthorizeUrl,
  parseAllowedOrigins,
  subscribeMagaluAuthMessages,
} from '../src/auth/index';

@customElement('sb-magalu-auth-simulator')
class SbMagaluAuthSimulator extends LitElement {
  @state() private log = '';

  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    const allowedOrigins = parseAllowedOrigins(window.location.origin);
    this.unsub = subscribeMagaluAuthMessages(
      (msg) => {
        this.log =
          msg.kind === 'authCode'
            ? `authCode: ${msg.code}`
            : 'magaluAuthDone';
      },
      { allowedOrigins }
    );
  }

  disconnectedCallback(): void {
    this.unsub?.();
    super.disconnectedCallback();
  }

  private simulate(): void {
    window.postMessage(
      { type: 'authCode', code: 'fake-code-storybook' },
      window.location.origin
    );
  }

  render() {
    const demoUrl = buildMagaluAuthorizeUrl({
      clientId: 'EXAMPLE_CLIENT_ID',
      redirectUri: buildGeraldoOAuthRedirectUri(),
      scopes: ['aqf:store:read'],
    });

    return html`
      <div style="font-family: system-ui; max-width: 40rem">
        <p>
          Origem atual: <code>${window.location.origin}</code>. O listener aceita mensagens desta origem.
        </p>
        <p>
          <button type="button" @click=${this.simulate}>Simular postMessage (authCode)</button>
        </p>
        <pre
          style="background:#f4f4f4;padding:1rem;white-space:pre-wrap;min-height:3rem"
        >${this.log || '(ainda sem mensagens)'}</pre>
        <p style="font-size:0.85rem;word-break:break-all;margin-top:1rem">
          <strong>URL de exemplo</strong> (não abre sozinha):<br />
          <code>${demoUrl}</code>
        </p>
      </div>
    `;
  }
}

const meta: Meta = {
  title: 'Integração/Magalu auth (helpers)',
  parameters: {
    docs: {
      description: {
        component:
          'Simula `postMessage` com `authCode` para testar `subscribeMagaluAuthMessages` sem rede. Fluxo real: README e `examples/magalu-auth-minimal`.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const SimularAuthCode: Story = {
  render: () => html`<sb-magalu-auth-simulator></sb-magalu-auth-simulator>`,
};
