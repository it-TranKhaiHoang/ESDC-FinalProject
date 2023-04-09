const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.status(401).flash('error', 'Access denied. No token provided');
        return res.redirect();
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).flash('error', 'Invalid Token');
            return res.redirect();
        } else {
            req.decodedToken = decodedToken;
            next();
        }
    });
};

module.exports = auth;
