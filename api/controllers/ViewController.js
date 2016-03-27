/**
 * ViewController
 *
 * @description :: Server-side logic for managing Views
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  async index(req, res) {
    const vm = {
      title: 'Home'
    };
    return res.view('home', {
      vm
    });
  },

  async selectCategory(req, res) {
    const categories = await Category.find({});
    const vm = { categories };

    return res.view('game/select-category', {
      vm
    });
  },

  async question(req, res) {
    const
      {gameId, questionNumber} = req.params,
      game = await Game.findOne({ id: gameId }).populate('questions'),
      questionId = game.questionsSorted()[questionNumber - 1].id,
      question = await Question.findOne({ id: questionId }).populate(['quote', 'multipleChoiceSpeakers']);

    const vm = { title: 'Question', game, question };
    return res.view('game/question', {
      vm,
      vms: JSON.stringify(vm)
    });
  },

  async result(req, res) {
    const {gameId} = req.params,
    game = await Game.findOne({ id: gameId }),
    twitterHandle = game.user,
    user = await User.findOne({ twitterHandle }).populate('games');

    const vm = { title: 'Results', game, user };
    return res.view('game/result', {
      vm,
      vms: JSON.stringify(vm)
    });
  },

  async user(req, res) {
    const vm = {
      title: 'User',
      userId: req.params.userId
    };
    return res.view('user', {
      vm
    });
  },

  /**
   * Create a game using the posted params and redirect to the question route.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  async game(req, res) {
    const game = await Game.create({
      category: req.param('category'),
      user: req.param('user')
    });
    return res.redirect(`/game/${game.id}/question/1`);
  }

};
