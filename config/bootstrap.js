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
import Promise from 'bluebird';

module.exports.bootstrap = async function bootstrap(cb) {

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
    await User.destroy({ twitterHandle: 'testUser' });
    await User.create({ twitterHandle: 'testUser', name: 'test user' });
  }

  cb();
};
