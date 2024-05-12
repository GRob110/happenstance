const { auth } = require('express-openid-connect');
const config = require('./config/keys');

module.exports = auth(config.auth0);