const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./config/keys');
const routes = require('./routes');
const authMiddleware = require('./middleware/authMiddleware');
const sessionMiddleware = require('./middleware/sessionMiddleware');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Middleware
app.use(express.json());
app.use(cookieParser()); //TODO: probably do not need
app.use(sessionMiddleware);

// TODO: Auth0 callback logging
app.use((req, res, next) => {
    console.log('Incoming Request: ', req.method, req.path);
    console.log('SessionState:', req.sessionState);
    console.log('Session:', req.session);
    console.log('SessionID:', req.sessionID);
    console.log('Cookies:', req.cookies);
    next();
});

// TODO: limit access to the API to authenticated users
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

console.log('cors enabled');

app.use(authMiddleware);

console.log('authMiddleware enabled');

// Routes
app.use('/', routes);

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build', 'index.html'));
});

module.exports = app;