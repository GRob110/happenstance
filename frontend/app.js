const express = require('express');
const session = require('express-session');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: 'http://localhost:3000',
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    authorizationParams: {
        response_type: 'code',
        scope: 'openid profile email',
    },
};

// Validate configuration
if (!config.issuerBaseURL.startsWith('https://')) {
  throw new Error('"issuerBaseURL" must be a valid URI and start with "https://".');
}

if (!config.clientSecret) {
  throw new Error('"clientSecret" is required for the "clientAuthMethod" "client_secret_basic".');
}

// Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(auth(config));

app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/profile', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            user: req.oidc.user,
            name: req.oidc.user.name,
        });
    } else {
        res.json({
            isAuthenticated: false,
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});