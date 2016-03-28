(function() {
	'use strict';

	function selectCategory() {
		var el = this;
		if (el.id !== undefined) {
			$.ajax({
			    url: '/game',
			    method: 'POST',
			    contentType: 'application/json', 
			    processData: false,
			    data: JSON.stringify({
			        user: el.dataset.user,
			        category: el.id
			     }),

			    success: function(data) {
			        console.log('Let\'s play WhoQuote!', data.redirect);
			        if (data.redirect) {
			            // data.redirect contains the string URL to redirect to
			            window.location.href = data.redirect;
			        }
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
		} else {
			console.log('category not supported');
		}
	}

	function play() {
		setTimeout(function() {
			$('body').css({
		      "overflow-y": "hidden"
		    });
			$('.background').animate({ top: '-=' + document.documentElement.clientHeight + 'px'}, 1200, 'easeInOutBack', 
				function () { 
					$('body').css({
				      "overflow-y": "auto",
				    });
				});
		}, 200);
	}

	function setHandlers() {
	// var categories = document.getElementsByClassName('parallax');
 	// for (var i = 0; i < categories.length; i++) {
 	//   categories[i].addEventListener('click', selectCategory, false);
    // }

	 var playBtn = document.getElementById('play-btn');
	 if (playBtn !== null) playBtn.addEventListener('click', play, false);
	}

	setHandlers();

})();