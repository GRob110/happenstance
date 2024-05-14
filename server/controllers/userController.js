const User = require('../models/User');

exports.createUser = async (req, res) => {
    const { username } = req.body;

    try {
        let user = new User({ username });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getProfile = (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            user: req.oidc.user,
            name: req.oidc.user.name,
        });
    } else {
        res.json({
            isAuthenticated: false,
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};