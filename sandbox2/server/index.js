const express = require('express');
const authCheck = require('./authCheck');

const app = express();

app.get('/api/protected', authCheck, (req, res) => {
  // Handle the protected endpoint logic
  res.json({ message: 'You accessed a protected endpoint!' });
});