const express = require('express');
const router = express.Router();
const userRoutes = require('./api/userRoutes');
const historyRoutes = require('./api/historyRoutes');

router.use('/api/users', userRoutes);
router.use('/api/', historyRoutes);

module.exports = router;