"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", {value: true});
exports.environment = {
  production: false,
  api_url_server: 'http://10.58.13.32:8081/spring-security-oauth-server',
  token_endpoint: '/oauth/token',
  grant_type: 'password',
  client_id: 'fooClientIdPassword',
  client_secret: 'secret',
  // api_url_server: 'http://10.58.12.250:8202',
  // token_endpoint: '/oauth/token',
  // grant_type: 'password',
  // client_id: 'trusted-app',
  // client_secret: 'secret',
  // api_url_resource: 'http://localhost:3000',
  // api_url_resource: 'http://10.58.13.32/oauth2-server/web',
  //api_url_resource: 'http://10.58.13.32:8207/api/v1.0',
  // api_url_resource: 'http://10.58.13.238:8800'
  api_url_resource: 'http://127.0.0.1:8207/api/v1.0'
};
