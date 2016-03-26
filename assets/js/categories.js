(function() {
  'use strict';

  function createCatListeners() {
      console.log('created cat listerns');
      var catArray = document.getElementsByClassName('parallax');
      for (var i = 0; i < catArray.length; i++) {
        catArray[i].addEventListener('click', pickCategory, false);
      }
    }

    function pickCategory() {
        var el = this;
        document.getElementById('loader').classList.remove('hidden');

        var request = $.ajax({
          url: "/game",
          method: "POST",
          contentType: 'application/json'
          data: JSON.stringify({
          category: el.id,
            user: 'testUser'
          }),
          success: function() {
              console.log('it worked');
          },
          failure: function(msg) {
              alert("Fail : " + msg);
          },
          error: function(xhr, status, text) {
              alert(text);
              var response = jQuery.parseJSON(xhr, responseText);
              alert(response.error);
          }
        });
      }

    // createCatListeners();
})();