const express = require('express');
const crypto = require('crypto');

const validateLogin = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateLogin, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;