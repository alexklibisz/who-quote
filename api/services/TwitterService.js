'use strict';

import Twitter from 'twitter';

const twitterAPI = new Twitter(sails.config.twitter);

/**
 * Check if the oldest quote is > 3 days old or there are
 * fewer than 10 quotes total for this category and speaker.
 * If that's the case, go and fetch 10 new quotes from twitter.
 */
module.exports.getNewQuotes = async function getNewQuotes({ category }) {

  const
    [quotesCount, lastQuotes] = await Promise.all([
      Quote.count({ category }),
      (Quote.find().sort('createdAt DESC').limit(1))
    ]),
    lastQuote = lastQuotes.shift(),
    msSinceCreated = new Date().getTime() - new Date(lastQuote.createdAt).getTime(),
    daysSinceCreated = (msSinceCreated / (1000*60*60*24));

  // Return if the newest quote is less than one day old and there are
  // more than 100 quotes total for this category.
  if(daysSinceCreated < 1 && quotesCount > 100) {
    return;
  }

  // Retrieve 5 new tweets for each user in this category
  const params = {
    screen_name: 'realDonaldTrump',
    count: 10,
    exclude_replies: true,
    include_rts: false
  };

  const trump = await twitterAPI.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      console.log(tweets);
    } else {
      console.error(error);
    }
  });


}
