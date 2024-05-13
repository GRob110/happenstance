const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/keys');
const routes = require('./routes');
const authMiddleware = require('./middleware/authMiddleware');
const sessionMiddleware = require('./middleware/sessionMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(authMiddleware);
app.use(sessionMiddleware);

// TODO: limit access to the API to authenticated users
app.use(cors());

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/', routes);

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build', 'index.html'));
});

module.exports = app;