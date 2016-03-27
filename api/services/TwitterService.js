'use strict';

import Twitter from 'twitter';
import Promise from 'bluebird';

const twitterAPI = new Twitter(sails.config.twitter);

module.exports.getUserProfile = async function({ twitterId }) {
  return new Promise(function(resolve, reject) {
    const params = { user_id: twitterId }
    twitterAPI.get('users/lookup', params, function(error, user, response){
      if (!error) resolve(user.shift());
      else reject(error);
    });
  });
};

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
  if(daysSinceCreated < 1 && quotesCount > 200) {
    return;
  }

  // Get the newest quote for each speaker
  const
    speakers = await Speaker.find({ category }),
    newestQuoteRequests = speakers.map(x => Quote.find({ speaker: x.twitterId }).limit(1)),
    newestQuotes = (await Promise.all(newestQuoteRequests)).map(x => x.shift());

  // Create tweet requests for each of the speakers.
  // End result should be an array of tweets, about 10 per user.
  const
    getTweets = function getTweets(twitterId, sinceId) {
      const params = {
        user_id: twitterId,
        since_id: sinceId,
        exclude_replies: true,
        include_rts: false,
        count: 10
      };
      if(params.since_id === 0) delete params.since_id;
      return new Promise(function(resolve, reject) {
        twitterAPI.get('statuses/user_timeline', params, function(error, tweets, response){
          if (!error) resolve(tweets);
          else reject(error);
        });
      });
    },
    tweetRequests = _.zip(speakers, newestQuotes)
      .map(x => getTweets(x[0].twitterId, ((x[1] !== undefined) ? x[1].tweetId : 0))),
    tweets = _.flatten((await Promise.all(tweetRequests)));

  // Convert the sanitized tweets into quote objects and create the quote objects.
  const
    quotes = tweets.map(x => {
      console.log(JSON.stringify(x, null, 2));
      return {
        tweetId: x.id,
        text: x.text,
        speaker: x.user.id,
        sourceURL: `https://twitter.com/${x.user.id}/status/${x.id_str}`,
        category
      };
    }),
    quoteCreateRequests = quotes.map(x => Quote.create(x)),
    createdQuotes = await Promise.all(quoteCreateRequests);
}
