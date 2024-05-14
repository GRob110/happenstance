const expressJwt = require('express-jwt');
const jwks = require('jwks-rsa');

const authCheck = expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-6q2l8zmczwn7un71.us.auth0.com/.well-known/jwks.json`,
  }),
  audience: 'http://localhost:5000',
  issuer: `https://dev-6q2l8zmczwn7un71.us.auth0.com`,
  algorithms: ['RS256'],
});

module.exports = authCheck;