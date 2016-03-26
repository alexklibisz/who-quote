module.exports.routes = {

  // View Routes
  // These are view routes that create server-rendered views.
  // The views are rendered via return res.view(viewName, viewModel)
  // with Handlebars templating in the view.
  '/': 'ViewController.index',
  '/game/select-category': 'ViewController.selectCategory',
  'POST /game': 'ViewController.game',
  '/game/:gameId/question/:questionNumber': 'ViewController.question',
  '/game/:gameId/result': 'ViewController.result',
  '/user/:userId': 'ViewController.user',

  // API Routes
  // Defined using the default blueprint methods.
  // Disabled and authenticated via policies.
};
