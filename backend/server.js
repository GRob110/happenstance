require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

/*
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

//MongoDB Connection   
mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String //TODO: Hash this password
});

const User = mongoose.model('User', userSchema);

//Routes
app.post('/createAccount', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send('User Created');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
*/