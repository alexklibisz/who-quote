module.exports = function cookieAuth(req, res, next) {
  sails.log.verbose('owner auth');
  next();
};
