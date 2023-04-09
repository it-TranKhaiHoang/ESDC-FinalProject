const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');
const LoginValidator = require('../validators/LoginValidator');

router.post('/login', LoginValidator, MemberController.postLogin);

module.exports = router;
