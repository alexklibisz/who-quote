/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports.attributes = {

  twitterHandle: {
    type: 'string',
    required: true,
    primaryKey: true
  },

  name: {
    type: 'string',
    required: true
  },

  games: {
    collection: 'Game',
    via: 'user'
  }

};
