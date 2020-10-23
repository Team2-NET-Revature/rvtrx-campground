import { Environment } from './types/environment.type';
import * as manifest from '../../package.json';
import * as ngConfig from '../../angular.json';

export const environment: Environment = {
  config: 'app.config.json',
  identity: {
    clientId: '0oa5empza950mqdtw357',
    issuer: 'https://dev-296872.okta.com/oauth2/default',
    pkce: true,
    redirectUri: `${location.origin}/oauth2/authorize`,
    scopes: ['email', 'openid', 'profile'],
  },
  monitoring: 'https://ec61288c429544a6ad850b94de25004a@o388320.ingest.sentry.io/5229046',
  name: 'DEV',
  production: true,
  release: `${ngConfig.defaultProject}@${manifest.version}`,
};
