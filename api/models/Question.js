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

  // Populated via put request when user answers
  selectedSpeaker: {
    model: 'Speaker'
  },

  // Set via beforeUpdate function
  isCorrect: {
    type: 'boolean',
    defaultsTo: false,
    required: true
  },

  isComplete: {
    type: 'boolean',
    defaultsTo: false,
    required: true
  },

  // TODO: remove the question.quote.speaker so ppl can't cheat.
  toJSON() {
    const question = this.toObject();
    return question;
  }
};

/**
 * Set the isCorrect value based on the selectedSpeaker before updating.
 * @param  {[type]}   updatedQuestion [description]
 * @param  {Function} next            [description]
 * @return {[type]}                   [description]
 */
module.exports.beforeUpdate = async function beforeUpdate(updatedQuestion, next) {
  const question = await Question.findOne({id: updatedQuestion.id}).populate('quote');
  if(updatedQuestion.selectedSpeaker !== undefined) {
    updatedQuestion.isCorrect = (updatedQuestion.selectedSpeaker === question.quote.speaker);
    updatedQuestion.isComplete = true;
  }
  next();
};
