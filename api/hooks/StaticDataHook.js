/**
 * Static Data Hook
 * This hook gets called when the app launches to populate static data
 * from JSON files into the database.
 */

module.exports = function staticDataHook(sails) {

  function initialize(callback) {
    sails.log.verbose('Populate the categories and speakers using static data');
    callback();
  };

  return {
    initialize
  };
};
