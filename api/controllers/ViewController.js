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

  async style(req, res) {
    const vm = {
      title: 'Style'
    };
    return res.view('style', {
      vm
    });
  },

  async selectCategory(req, res) {
    const vm = {
      title: 'Select a Category',
      categories: [{
        'title': 'Politicians',
        'image': '/images/politicians.jpg'
      }, {
        'title': 'Athletes',
        'image': '/images/athletes.jpg'
      }, {
        'title': 'Musicians',
        'image': '/images/musicians.jpg'
      }, {
        'title': 'Movie Stars',
        'image': '/images/movie-stars.jpg'
      }, {
        'title': 'TV Personalities',
        'image': '/images/tv-personalities.jpg'
      }]
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
