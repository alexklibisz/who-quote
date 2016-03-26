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
    type: 'array'
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

module.exports.beforeCreate = function beforeCreate(values, cb) {
  // TODO: populate the multiple choice speakers randomly
  // using the category on the game object.
  cb();
};

module.exports.beforeUpdate = function beforeUpdate(valuesToUpdate, cb) {
  // TODO: verify the selectedSpeaker and set isCorrect.
  cb();
}
