const express = require('express');
const path = require('path');
//const mongoose = require('mongoose');
//const sessionMiddleware = require('./middleware/sessionMiddleware');
//const { auth, requiresAuth } = require('express-openid-connect');
const config = require('./config/keys');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

//mongoose.connect(config.mongoURI);

//app.use(sessionMiddleware);

app.use(authMiddleware);

/*
app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.send(`Hello ${req.oidc.user.name}, you are logged in! <a href="/logout">Logout</a>`);
    } else {
        res.send('Hello, please <a href="/login">login</a>');
    }
});
*/

/*
app.get('/logout', (req, res) => {
    req.oidc.logout();
});
*/

/*
app.get('/login', (req, res) => {
    res.oidc.login();
});
*/

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});