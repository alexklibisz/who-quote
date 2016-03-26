/**
 * Static Data Hook
 * This hook gets called when the app launches to populate static data
 * from JSON files into the database.
 */

const CategoryJSON = require('../static/Category.json');
const SpeakerJSON = require('../static/Speaker.json');

module.exports = function staticDataHook(sails) {

  async function initialize(callback) {
    sails.log.verbose('Populate the categories and speakers using static data');
    sails.log.verbose(CategoryJSON);
    sails.log.verbose(SpeakerJSON);

    // Create the categories

    // Create the speakers

    callback();
  };

  return {
    initialize
  };
};
