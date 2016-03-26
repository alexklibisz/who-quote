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
  const categoryCreatePromises = CategoryJSON.map(x => Category.create(x));
  await Category.destroy({});
  await Promise.all(categoryCreatePromises);

  // Destroy and recreate speakers
  const speakerCreatePromises = SpeakerJSON.map(x => Speaker.create(x));
  await Speaker.destroy({});
  await Promise.all(speakerCreatePromises);

  if(process.env.NODE_ENV === 'development') {
    // Create a testing user
    const testUser = await User.find({ name: 'test user' });
    if(testUser.length === 0) {
      await User.destroy({ twitterHandle: 'testUser' });
      await User.create({ twitterHandle: 'testUser', name: 'test user' });
    }
    
    // Create quotes
    // const quoteCreatePromises = QuoteJSON.map(x => Quote.create(x));
    // await Quote.destroy({});
    // await Promise.all(quoteCreatePromises);

    // Destroy games and questions
    // await Game.destroy();
    // await Question.destroy();
  }

  cb();
};
