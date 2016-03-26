/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports.attributes = {

  game: {
    model: 'Game',
    required: true
  },

  quote: {
    model: 'Quote',
    required: true
  },

  // Populated when the question is created
  multipleChoiceSpeakers: {
    collection: 'Speaker',
    required: true
  },

  // Populated via patch request when user answers
  selectedSpeaker: {
    model: 'Speaker'
  },

  isCorrect: {
    type: 'boolean',
    defaultsTo: null
  }

};

module.exports.beforeCreate = function beforeCreate(values, next) {
  // TODO: populate the multiple choice speakers randomly
  // using the category on the game object.
  next();
};

module.exports.beforeUpdate = function beforeUpdate(valuesToUpdate, next) {
  // TODO: verify the selectedSpeaker and set isCorrect.
  next();
}
