const MemberService = require('../services/MemberService');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
function hashPassword(password) {
    let saltRounds = 10;
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}
const MemberController = {
    postLogin: (req, res, next) => {
        let result = validationResult(req);
        if (result.errors.length === 0) {
            const { email, password } = req.body;
            MemberService.getOne({ email })
                .then((user) => {
                    if (!user) {
                        req.flash('error', 'Email Not Found');
                        return res.redirect('/login');
                    } else {
                        bcrypt
                            .compare(password, user.password)
                            .then((isValidPassword) => {
                                if (!isValidPassword) {
                                    req.flash('error', 'Incorrect Password');
                                    res.redirect('/login');
                                }
                                const JWT_SECRET = process.env.JWT_SECRET;
                                const token = jwt.sign({ email: user.email }, JWT_SECRET);
                                req.session.email = user.email;
                                req.session.position = user.position;
                                req.session.id = user._id;
                                req.session.token = token;
                                req.session.fullname = user.fullname;
                                req.flash('success', 'Login successful');
                                return res.redirect('/');
                            })
                            .catch((err) => {
                                req.flash('error', 'Login Fail ' + err);
                                res.redirect('/login');
                            });
                    }
                })
                .catch((err) => {
                    req.flash('error', 'Login Fail ' + err);
                    res.redirect('/login');
                });
        } else {
            result = result.mapped();
            let message;
            for (let f in result) {
                message = result[f].msg;
                break;
            }
            const { email, password } = req.body;
            req.flash('email', email);
            req.flash('password', password);
            req.flash('error', message);
            res.redirect('/login');
        }
    },
    getList: (req, res, next) => {
        {
            MemberService.getList({}, {}, {})
                .then((members) => {
                    if (members.length == 0) return res.json({ msg: 'Empty' });
                    res.json(members);
                })
                .catch((err) => {
                    return res.json({ msg: 'error' });
                });
        }
    },
};

module.exports = MemberController;
