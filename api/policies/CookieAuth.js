module.exports = function cookieAuth(req, res, next) {
  sails.log.verbose('cookie auth');
  next();
};
