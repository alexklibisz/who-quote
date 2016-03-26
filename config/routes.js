/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  // View Routes
  // These are view routes that create server-rendered views.
  // The views are rendered via return res.view(viewName, viewModel)
  // with Handlebars templating in the view.
  '/': 'ViewController.index',
  '/style': 'ViewController.style',
  '/play/select-category': 'ViewController.selectCategory',
  '/play/:gameId/question/:questionNumber': 'ViewController.question',
  '/play/:gameId/result': 'ViewController.result',
  '/user/:userId': 'ViewController.user',

  // API Routes
  // These are API routes that will be consumed from the client-side
  // javascript and from the mobile application.

  /**
   * TODO: API routes for:
   * - get categories
   * - create a game
   * - get a question
   * - submit an answer
   * - get game result
   * - get a user's profile information
   * - get a user's results
   */

};