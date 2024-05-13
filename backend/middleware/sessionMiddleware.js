const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('../config/keys.js');

const store = new MongoDBStore({
    uri: config.MONGO_URI,
    collection: 'sessions'
});

store.on('error', function(error) {
    console.log(error);
});

const sessionMiddleware = session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: false, // TODO: Set to true when using https
    }
});

module.exports = sessionMiddleware;