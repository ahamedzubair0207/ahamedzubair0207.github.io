export default {
    oidc: {
      clientId: '0oavx0aysCD09oN08356',
      issuer: 'https://dev-575017.okta.com/oauth2/default',
      redirectUri: 'http://localhost:8080/implicit/callback',
      scope: 'openid profile email',
      testing: {
        disableHttpsCheck: false
      }
    },
    resourceServer: {
      messagesUrl: 'http://localhost:55599/api/Workouts',
    },
  };
  