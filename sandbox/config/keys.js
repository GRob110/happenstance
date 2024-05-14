module.exports = {
    mongoURI: 'mongodb://localhost:27017/happenstance',
    auth0: {
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: 'https://dev-6q2l8zmczwn7un71.us.auth0.com',
        clientID: 'NRfoOLMeJcJLxqS5i2carZc9EmP3ODaV',
        clientSecret: '25Sc8kRlXVgKLq6HdQYOs4cZ8ZwXg8x_5NQsl_eYmS8zvS70oH_f7We4u-EosspB',
        secret: 'cc5936c2bb14a98ee609d3eb6adbc039fe07f6cc309cd9c81fe8c6ce33a7878a',
        baseURL: 'http://localhost:5000',
        authorizationParams: {
            response_type: 'code',
            scope: 'openid profile email',
        },
        routes: {
            //callback: '/', // TDOO: Might need this later, Callback URL
            postLogoutRedirect: '/', // Post-Logout Redirect URL
        },
    },
    session: {
        secret: 'cc5936c2bb14a98ee609d3eb6adbc039fe07f6cc309cd9c81fe8c6ce33a7878a',
    }
};