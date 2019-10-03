module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else if (req.user.auth !== 'admin') {
    res.status(403).end();
  } else {
    return next();
  }
};
