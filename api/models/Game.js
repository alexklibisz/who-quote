/**
 * Game.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports.attributes = {

  user: {
    model: 'User',
    required: true
  },

  category: {
    model: 'Category',
    required: true
  },

  questions: {
    collection: 'Question',
    via: 'game'
  }
};

/**
 * After the initial game object has been created, generate the questions
 * for it and add them to the model. This stuff could be split up into the
 * question model as well, but I think it's simpler to contain it here.
 * @param  {[type]}   game [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
module.exports.afterCreate = async function afterCreate(game, next) {

  function randomArray(min, max, length) {
    const unique = {};
    while(Object.keys(unique).length < Math.min(max - min, length)) {
      unique[Math.floor(Math.random() * max) + min] = true;
    }
    return Object.keys(unique);
  }

  // Questions need: game (game id), quote, multipleChoiceSpeakers.
  const
    questionCount = 5,
    quoteCount = await Question.count(),
    quoteOffsets = randomArray(0, quoteCount, questionCount);

  console.log(quoteOffsets);

  await Game.update(game.id, game);

  next();
};
