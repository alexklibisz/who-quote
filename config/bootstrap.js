/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

import CategoryJSON from '../api/static/Category.json';
import SpeakerJSON from '../api/static/Speaker.json';
import QuoteJSON from '../api/static/Quote.json';
import Promise from 'bluebird';

module.exports.bootstrap = function bootstrap(cb) {

  // Create categories
  const categoryCreatePromises = CategoryJSON.map(x => Category.findOrCreate({ slug: x.slug }, x));
  Promise.all(categoryCreatePromises)
    .then(() => sails.log.verbose('bootstrap: create categories'));

  // Create speakers
  const speakerCreatePromises = SpeakerJSON.map(x => Speaker.findOrCreate(x, x));
  Promise.all(speakerCreatePromises)
    .then(() => sails.log.verbose('bootstrap: create speakers'));

  // Sync speakers with Twitter
  const speakerSyncPromises = SpeakerJSON.map(x => Speaker.syncWithTwitter({ twitterId: x.twitterId }));
  Promise.all(speakerSyncPromises)
    .then(() => sails.log.verbose('bootstrap: sync speakers with twitter'));

  if(process.env.NODE_ENV === 'development') {
    // Create a testing user
    const testUser = { twitterHandle: 'testUser', name: 'test user' };
    User.findOrCreate(testUser, testUser)
      .then(() => sails.log.verbose('bootstrap: create test user'));

    // Create quotes
    const quoteCreatePromises = QuoteJSON.map(x => Quote.findOrCreate(x, x));
    Promise.all(quoteCreatePromises)
      .then(() => sails.log.verbose('bootstrap: create quotes'));
  }

  cb();
};
