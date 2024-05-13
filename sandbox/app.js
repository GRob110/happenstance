const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const { auth0 } = require('../backend/config/keys');

const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'cc5936c2bb14a98ee609d3eb6adbc039fe07f6cc309cd9c81fe8c6ce33a7878a',
    issuerBaseURL: 'https://dev-6q2l8zmczwn7un71.us.auth0.com',
    clientID: 'NRfoOLMeJcJLxqS5i2carZc9EmP3ODaV',
    clientSecret: '25Sc8kRlXVgKLq6HdQYOs4cZ8ZwXg8x_5NQsl_eYmS8zvS70oH_f7We4u-EosspB',
    baseURL: 'http://localhost:5000',
};

app.use(auth(config));

app.get('/', requiresAuth(), (req, res) => {
    res.send(`Hello ${req.oidc.user.name}, you are logged in!`);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});