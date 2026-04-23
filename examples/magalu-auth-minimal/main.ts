import { createGeraldoMagaluAuth, parseAllowedOrigins } from '@aiqfome-org/geraldo-ui/auth';

const clientId = import.meta.env.VITE_MAGALU_CLIENT_ID ?? '';

const allowedOrigins = parseAllowedOrigins(
  import.meta.env.VITE_POSTMESSAGE_ORIGINS ??
    'https://geraldo-restaurantes.aiqfome.com,http://localhost:5175'
);

function log(text: string): void {
  const el = document.querySelector('#log');
  if (el) el.textContent = text;
}

const magaluAuth = createGeraldoMagaluAuth({
  clientId,
  scopes: ['aqf:store:read'],
  allowedOrigins,
  onMessage(msg) {
    if (msg.kind === 'authCode') {
      log(
        `authCode recebido.\nEnviar ao backend (POST) com o mesmo redirect_uri usado no authorize:\ncode=${msg.code}\nredirect_uri=${magaluAuth.redirectUri}`
      );
      return;
    }
    log('magaluAuthDone (popup fechou / fluxo local).');
  },
});

document.querySelector('#login')?.addEventListener('click', () => {
  if (!clientId || clientId === 'REPLACE_ME') {
    log('Define VITE_MAGALU_CLIENT_ID no ficheiro .env (copia env.sample para .env).');
    return;
  }
  const result = magaluAuth.openLogin();
  if (!result.ok) {
    if (result.reason === 'missing_client_id') {
      log('Client ID em falta.');
    } else {
      log('Popup bloqueado — permite popups para este site.');
    }
    return;
  }
  log('Popup aberto. Conclui o login no Magalu…');
});
