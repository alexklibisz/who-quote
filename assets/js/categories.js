(function() {
  'use strict';

  function createCatListeners() {
      var catArray = document.getElementsByClassName('parallax');
      for (var i = 0; i < catArray.length; i++) {
        catArray[i].addEventListener('click', pickCategory, false);
      }
    }

    function pickCategory() {
        document.getElementById('loader').classList.remove('hidden');
    }

    createCatListeners();
})();