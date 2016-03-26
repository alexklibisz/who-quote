(function() {
	'use strict';

	var speakers = [];
	var answered = false;
	var question = {};

	function selectSpeaker() {
		var el = this;

		question = document.getElementById('question').dataset.question;
		var qId = question.id
		console.log(el.dataset, qId);

		$.ajax({
		    url: '/question/' + qId,
		    method: 'POST',

		    // Tell the server we're sending JSON--not strictly necessary with Sails,
		    // but recommended.
		    contentType: 'application/json', 

		    // Don't URLencode data
		    processData: false,

		    // Stringify the data--otherwise it will send "[object object]"
		    data: JSON.stringify({
		        selectedSpeaker: el.dataset.th
		     }),

		    success: function(result) {
		        // window.location('/character/show/'+$("a#identity-edit").attr("data-id"));
		        console.log('Lets see... ', result);
		        displayAns(result.isCorrect);
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

		// for (var i = 0; i < speakers.length; i++) {
	 //      speakers[i].classList.remove('selected');
	 //    }
	 //    el.classList.add('selected');
	    //document.getElementById('q-action').innerHTML = 'Submit';
	}

	function displayAns(isCorrect) {
		var answered = true;
		if (isCorrect) {
			// Good job! :)
			console.log(answered, question);

		} else {
			// Awww.. better luck next time :(

		}
		$('action').html = 'Next';
	}

	function nextOrForfiet() {
		if (answered) {
			// next
			window.location('game/' + question.game.id + '/question' + question.id);
		} else {
			// home
			window.location('game/select-category');
		}
	}

	function setHandlers() {
		speakers = document.getElementsByClassName('person');
	    for (var i = 0; i < speakers.length; i++) {
	      speakers[i].addEventListener('click', selectSpeaker, false);
	    }

	    $( 'action' ).on( 'click', function(event) {
		  nextOrForfiet();
		});

	    console.log('set handlers');
	}

	setHandlers();
})();