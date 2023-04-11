const role = (role) => {
    return (req, res, next) => {
        if (role.includes(req.session.position)) {
            req.flash('error', 'Access denied');
            return res.redirect('/logout');
        }
        next();
    };
};

module.exports = role;
