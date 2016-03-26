// TODO: only allow the model to be updated if the previous value was not defined.
module.exports = function cookieAuth(req, res, next) {
  sails.log.verbose('write once');
  next();
};
