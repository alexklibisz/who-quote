/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports.attributes = {

  facebookId: {
    type: 'string',
    required: true
  },

  // Populated automatically
  // createdAt: {}

  name: {
    type: 'string',
    required: true
  },

  game: {
    collection: 'Game',
    via: 'createdBy'
  }

};
