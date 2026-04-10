import {
  buildGeraldoOAuthRedirectUri,
  buildMagaluAuthorizeUrl,
  openMagaluLoginWindow,
  parseAllowedOrigins,
  subscribeMagaluAuthMessages,
} from '@aiqfome-org/geraldo-ui/auth';

const clientId = import.meta.env.VITE_MAGALU_CLIENT_ID ?? '';

const allowedOrigins = parseAllowedOrigins(
  import.meta.env.VITE_POSTMESSAGE_ORIGINS ??
    'https://geraldo-restaurantes.aiqfome.com,http://localhost:5175'
);

function log(text: string): void {
  const el = document.querySelector('#log');
  if (el) el.textContent = text;
}

subscribeMagaluAuthMessages(
  (msg) => {
    if (msg.kind === 'authCode') {
      log(
        `authCode recebido.\nEnviar ao backend (POST) com o mesmo redirect_uri usado no authorize:\ncode=${msg.code}\nredirect_uri=${buildGeraldoOAuthRedirectUri()}`
      );
      return;
    }
    log('magaluAuthDone (popup fechou / fluxo local).');
  },
  { allowedOrigins }
);

document.querySelector('#login')?.addEventListener('click', () => {
  if (!clientId || clientId === 'REPLACE_ME') {
    log('Define VITE_MAGALU_CLIENT_ID no ficheiro .env (copia env.sample para .env).');
    return;
  }
  const redirectUri = buildGeraldoOAuthRedirectUri();
  const url = buildMagaluAuthorizeUrl({
    clientId,
    redirectUri,
    scopes: ['aqf:store:read'],
  });
  const w = openMagaluLoginWindow(url);
  if (!w) {
    log('Popup bloqueado — permite popups para este site.');
  } else {
    log('Popup aberto. Conclui o login no Magalu…');
  }
});
