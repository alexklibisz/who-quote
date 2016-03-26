(function() {
	'use strict';

	var speakers = null;
	var speakerSelected = false;

	function selectSpeaker() {
		var el = this;

		for (var i = 0; i < speakers.length; i++) {
	      speakers[i].classList.remove('selected');
	    }
	    el.classList.add('selected');

	    document.getElementById('q-action').innerHTML = 'Submit';
	}

	function setHandlers() {
		speakers = document.getElementsByClassName('person');
	    for (var i = 0; i < speakers.length; i++) {
	      speakers[i].addEventListener('click', selectSpeaker, false);
	    }

	    console.log('set handlers');
	}

	setHandlers();
})();