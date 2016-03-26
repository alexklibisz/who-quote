module.exports.attributes = {

  category: {
    model: 'Category',
    required: true
  },

  speaker: {
    model: 'Speaker',
    required: true
  },

  text: {
    type: 'string',
    required: true
  },

  sourceURL: {
    type: 'string',
    required: true
  }

};

/**
 * Check if the oldest quote is > 3 days old or there are
 * fewer than 10 quotes total for this category and speaker.
 * If that's the case, go and fetch 10 new quotes from twitter.
 * @return {[type]} [description]
 */
module.exports.getNewQuotes = function getNewQuotes({ category, speaker }) {

  return;
};

/**
 * Get count random quotes for the passed category.
 * @param  {[type]} {     category      [description]
 * @param  {[type]} count }             [description]
 * @return {[type]}       [description]
 */
module.exports.getRandomQuotes = function getRandomQuotes({ category, count }) {
  return [];
};
