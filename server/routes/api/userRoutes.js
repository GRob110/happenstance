const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/user', userController.createUser);
router.get('/profile', userController.getProfile);

//TODO: use this effectively
router.get('/users', userController.getUsers);

module.exports = router;