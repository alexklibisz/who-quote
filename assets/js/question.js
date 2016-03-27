(function() {
	'use strict';

	var speakers = [];
	var answered = false;
	var question = {};
	var game = {};

	function selectSpeaker() {
		var el = this;

		$.ajax({
		    url: '/api/question/' + vm.question.id,
		    method: 'PUT',

		    // Tell the server we're sending JSON--not strictly necessary with Sails,
		    // but recommended.
		    contentType: 'application/json', 

		    // Don't URLencode data
		    processData: false,

		    // Stringify the data--otherwise it will send "[object object]"
		    data: JSON.stringify({
		        selectedSpeaker: el.id
		     }),

		    success: function(result) {
		        console.log('Lets see... ', result);
		        answered = true;
				if (result.isCorrect) {
					// Good job! :)
					el.classList.add('success');
				} else {
					// Awww.. better luck next time :(
					el.classList.add('fail');
				}
				document.getElementById('action-btn').innerHTML ='Next';
				document.getElementById('action-btn').classList.add('continue');
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

	function nextOrForfiet() {
		console.log(answered);
		if (answered) {
			// next
			var url = window.location.href;
			var qNum = parseInt(url.substr(url.lastIndexOf("/")+1)) + 1;
			if(qNum > vm.game.questions.length) {
				console.log('end game');
			} else {
				window.location = '/game/' + vm.game.id + '/question/' + qNum;
			}
		} else {
			// home
			window.location = '/game/select-category';
		}
	}

	function setHandlers() {
		speakers = document.getElementsByClassName('person');
	    for (var i = 0; i < speakers.length; i++) {
	      speakers[i].addEventListener('click', selectSpeaker, false);
	    }

	    $('#action-btn').on( 'click', function(event) {
		  nextOrForfiet();
		});		
	}

	setHandlers();
})();