const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.session.token;
    if (!token) {
        req.flash('error', 'Access denied. No token provided');
        return res.redirect('/logout');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            req.flash('error', 'Invalid Token');
            return res.redirect('/logout');
        } else {
            req.decodedToken = decodedToken;
            next();
        }
    });
};

module.exports = auth;
