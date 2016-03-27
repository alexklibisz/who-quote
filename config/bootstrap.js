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

module.exports.bootstrap = async function bootstrap(cb) {

  // Define promises to throw errors instead of swallowing them
  Promise.onPossiblyUnhandledRejection(function (error) {
    console.error(error);
    throw error;
  });

  // Destroy and recreate categories
  const categoryCreatePromises = CategoryJSON.map(x => Category.findOrCreate({ slug: x.slug }, x));
  await Promise.all(categoryCreatePromises);

  // Destroy and recreate speakers
  const speakerCreatePromises = SpeakerJSON.map(x => Speaker.findOrCreate(x, x));
  await Promise.all(speakerCreatePromises);

  if(process.env.NODE_ENV === 'development') {
    // Create a testing user
    const testUser = { twitterHandle: 'testUser', name: 'test user' };
    await User.findOrCreate(testUser, testUser);

    // Create quotes
    const quoteCreatePromises = QuoteJSON.map(x => Quote.findOrCreate(x, x));
    await Promise.all(quoteCreatePromises);
  }

  cb();
};
