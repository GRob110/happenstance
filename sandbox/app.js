const express = require('express');
const path = require('path');
const session = require('express-session');
const config = require('./config/keys');
const { auth } = require('express-openid-connect');

const app = express();

app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true
}));

app.use(auth(config.auth0));

// Serve static files from React app
app.use(express.static(path.resolve(__dirname, '..', 'frontend', 'build')));

app.get('*', (req, res) => {
    const link = path.resolve(__dirname, '..', 'frontend', 'build', 'index.html');
    console.log(link);
    res.sendFile(link);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});