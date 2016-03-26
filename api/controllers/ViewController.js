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
    const vm = {
      title: 'Select a Category'
    };
    return res.view('play/select-category', {
      vm
    });
  },

  async question(req, res) {
    const vm = {
      title: 'Question',
      gameId: req.params.gameId,
      questionNumber: req.params.questionNumber
    };
    return res.view('play/question', {
      vm
    });
  },

  async result(req, res) {
    const vm = {
      title: 'Result',
      gameId: req.params.gameId
    };
    return res.view('play/result', {
      vm
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
  }
};
