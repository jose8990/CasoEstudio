export const environment = {
  production: true,
  // api_url_server: 'http://localhost:8083/oauth-server',
  // api_url_server: 'http://10.58.12.250:8200/oauth-server',
  // api_url_server: 'http://10.58.12.250:8200/oauth-server',
  api_url_server: 'http://10.58.13.32:8200/oauth-server',
  token_endpoint: '/oauth/token',
  grant_type: 'password',
  client_id: 'sigquo',
  client_secret: 'secret',

  // api_url_server: 'http://10.58.12.250:8202',
  // token_endpoint: '/oauth/token',
  // grant_type: 'password',
  // client_id: 'trusted-app',
  // client_secret: 'secret',

  // api_url_resource: 'http://localhost:3000',
  // api_url_resource: 'http://10.58.13.32/oauth2-server/web',
  // api_url_resource: 'http://10.58.13.32:8207/api/v1.0',
  // api_url_resource: 'http://10.58.13.238:8800'
  // api_url_resource: 'http://localhost:8207/api/v1.0',
  // api_url_resource: 'http://10.58.12.250:8202/api/v1.0',
  api_url_resource: 'http://10.58.13.32:8202/api/v1.0',
};
