/**
 * Speaker.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports.attributes = {

  name: {
    type: 'string',
    required: true
  },

  twitterHandle: {
    type: 'string',
    required: true,
    primaryKey: true
  },

  category: {
    model: 'Category',
    required: true
  }

};
