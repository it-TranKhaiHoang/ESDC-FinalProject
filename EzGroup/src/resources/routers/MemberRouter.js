const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');
const LoginValidator = require('../validators/LoginValidator');
const auth = require('../auth/auth');
router.post('/login', LoginValidator, MemberController.postLogin);

router.get('/list', MemberController.getList);

router.get('/listLeader', auth, MemberController.getListLeader);

router.get('/listMember', auth, MemberController.getListMember);

module.exports = router;
