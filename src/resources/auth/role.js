const role = (role) => {
  return (req, res, next) => {
    if (role.includes(req.user.role)) {
      return res.status(403).flash("error", "Access denied").redirect();
    }
    next();
  };
};

module.exports = role;
