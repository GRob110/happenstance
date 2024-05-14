const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('../config/keys.js');

const store = new MongoDBStore({
    uri: config.mongoURI,
    collection: 'sessions'
});

store.on('error', function(error) {
    console.log(error);
});

const sessionMiddleware = session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: false, //TODO: change to true in production
    }
});

module.exports = sessionMiddleware;