const express = require('express');
const { registration, checking } = require('../control/register');
const router = express.Router();

router.route('/register').post(registration);
router.route('/login').post(checking);

module.exports = router;