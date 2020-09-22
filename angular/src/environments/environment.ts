import { Environment } from './types/environment.type';
import * as manifest from '../../package.json';
import * as ngConfig from '../../angular.json';

export const environment: Environment = {
  config: 'app.config.local.json',
  identity: {
    clientId: '0oa5empza950mqdtw357',
    issuer: 'https://identity.rvtr.net/oauth2/default',
    pkce: true,
    redirectUri: `${location.origin}/oauth2/authorize`,
    scopes: ['email', 'openid', 'profile'],
  },
  monitoring: '',
  name: '',
  production: false,
  release: `${ngConfig.defaultProject}@${manifest.version}`,
};
