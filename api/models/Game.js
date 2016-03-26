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

  // Questions need: game (game id), quote, multipleChoiceSpeakers.
  const questionCount = 5;

  // Get questionCount random quotes, one per question
  const
    quoteCount = await Quote.count(),
    quoteOffsets = _.shuffle(_.range(quoteCount)).splice(0, questionCount),
    quoteRequests = quoteOffsets.map(x => Quote.find().limit(1).skip(x)),
    quotes = (await Promise.all(quoteRequests)).map(x => x.shift());

  // Create the speaker groups. Each group should be an array contining the
  // quote speaker and three other speakers in shuffled order.
  const
    speakers = await Speaker.find({ category: game.category }),
    multipleChoiceSpeakerGroups = quotes.map((quote) => {
      const
        quoteSpeaker = speakers.filter(x => x.twitterHandle === quote.speaker),
        filtered = speakers.filter(x => x.twitterHandle !== quote.speaker),
        shuffled = _.shuffle(filtered);
      return _.shuffle(shuffled.splice(0,3).concat(quoteSpeaker));
    });

  // Create the actual questions by zipping up the quotes and multipleChoiceSpeakerGroups
  const
    questionObjects = _.zip(quotes, multipleChoiceSpeakerGroups)
      .map(x => {
        const
          quote = x[0].id,
          multipleChoiceSpeakers = x[1].map(x => x.twitterHandle);
        return {
          game: game.id, quote, multipleChoiceSpeakers
        };
      }),
    questionCreatePromises = questionObjects.map(x => Question.create(x)),
    questions = await Promise.all(questionCreatePromises);

  next();
};
