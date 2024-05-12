const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./db');
const mongoose = require('mongoose');
const { auth } = require('express-openid-connect');
const config = require('./config/keys');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
}));

app.use(authMiddleware);

// TODO: limit access to the API to authenticated users
app.use(cors());

app.use(express.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/', require('./routes'));


// Serve static files from React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build', 'index.html'));
});

module.exports = app;