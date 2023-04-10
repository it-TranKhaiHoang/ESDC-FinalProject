const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');
const LoginValidator = require('../validators/LoginValidator');

router.post('/login', LoginValidator, MemberController.postLogin);

router.get('/list', MemberController.getList);

router.get('/listLeader', MemberController.getListLeader);

router.get('/listMember', MemberController.getListMember);

module.exports = router;
