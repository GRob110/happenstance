const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const app = express();

// TODO: change secret keys
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

// TODO: Store user histories in a database
const userHistories = {};

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

// TODO: limit access to the API to authenticated users
app.use(cors());

app.use(express.json());

// Routes
app.post('/api/history', (req, res) => {
    const history = req.body.history;

    if (!history) {
        console.log('no history provided');
        return res.status(400).json({ message: 'No history provided' });
    }

    userHistories['testUser'] = [];

    userHistories['testUser'].push(...history);
    console.log('saved history', userHistories['testUser']);

    res.status(200).json({ message: 'History saved' });
});

//example fetch history
app.get('/api/history', (req, res) => {
    const user = req.params.username;

    if (!userHistories[user]) {
        return res.status(404).json({ message: 'No history found' });
    }

    res.status(200).json({ history: userHistories[user] });
});

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