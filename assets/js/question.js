(function() {
	'use strict';

	var speakers = [];
	var answered = false;

	function selectSpeaker() {
		var el = this;
		if (answered) return;

		answered = true;
		$.ajax({
		    url: '/api/question/' + vm.question.id,
		    method: 'PUT',
		    contentType: 'application/json', 
		    processData: false,
		    data: JSON.stringify({
		        selectedSpeaker: el.id
		     }),

		    success: function(result) {
		        console.log('Lets see... ', result);		   
				displayAns(result.isCorrect, el);
		    },
		    failure: function(msg) {
		        alert("Fail to submit vote: " + msg);
		        answered = false;
		    },
		    error: function(xhr, status, text) {
		        answered = false;
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
				window.location = '/game/' + vm.game.id + '/result';
			} else {
				window.location = '/game/' + vm.game.id + '/question/' + qNum;
			}
		} else {
			// home
			window.location = '/';
		}
	}

	function displayAns(isCorrect, selected) {
		if (isCorrect) {
			// Good job! :)
			selected.classList.add('success');
		} else {
			// Awww.. better luck next time :(
			selected.classList.add('fail');

			var speakerId = vm.question.quote.speaker;
			document.getElementById(speakerId).classList.add('success');
		}
		document.getElementById('action-btn').innerHTML ='Next';
		document.getElementById('link').classList.add('show');
		document.getElementById('action-btn').classList.add('continue');
	}


	function pollVm() {
	    setTimeout(function() {
	    	if (vm !== undefined) {
	    		console.log(vm);
				if (vm.question.isComplete === true) {
					answered = true;
					var selected = document.getElementById(vm.question.selectedSpeaker);
					displayAns(vm.question.isCorrect, selected);
				}
	    	} else {
	    		console.log('Try again... ');
	    		pollVm();
	    	}
	    }, 10);
	}

	function setHandlers() {
		speakers = document.getElementsByClassName('person');
	    for (var i = 0; i < speakers.length; i++) {
	      speakers[i].addEventListener('click', selectSpeaker, false);
	    }

	    $('#action-btn').on( 'click', function(event) {
		  nextOrForfiet();
		});

		pollVm();
	}

	setHandlers();
})();