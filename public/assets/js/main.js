$( document ).ready(function() {
    
	var $_GET = {};

	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
		function decode(s) {
			return decodeURIComponent(s.split("+").join(" "));
		}
	
		$_GET[decode(arguments[1])] = decode(arguments[2]);
	});

	if (!$_GET["keyphrase"]) {
		return;
	}
	
	$('#intro_well').hide();
	$('#troll_well').slideDown('slow');
	$("#pointer").show();
	$('*').css('cursor', 'none');
	var pos = $('input[id=search_bar_input]').offset();
	$("#pointer").animate({
		left: pos.left + 150,
		top: pos.top + 20
	}, 2500, function() {
		
		$('#troll_alert').html('<strong>Γράψε στο κουτάκι αυτό που θες να βρεις.</strong>');
      	$("#search_bar_input").typed({
        	strings: [$_GET["keyphrase"]],
        	typeSpeed: 100,
			showCursor: true,
        	cursorChar: "|",
			callback: function() {
				pos = $('#sub_btn').offset();
				$("#pointer").animate({
					left: pos.left + 50,
					top: pos.top + 15
				}, 2500, function() {
					$('#troll_alert').html('<strong>Μετά κάνε κλικ στο κουμπί "Αναζήτηση".</strong>')
					setTimeout(function() {
						$('#troll_alert').html('<strong>Δεν είναι τόσο δύσκολο, έτσι?</strong>')
						setTimeout(function() {
							window.location.href = "https://www.skroutz.gr/search?keyphrase=" + $_GET["keyphrase"];
						}, 1500);
					}, 1500);
				});
			}
      	});
	});
	

});

function magic() {
	
	
	$('#well').hide();
	var searchTerm = $('input[id=search_bar_input]').val();
	
	if (searchTerm.length < 1) {
		$('#search_bar_input').select();
		return;
	}
	
	var encodedString = encodeURIComponent(searchTerm);
	var keyphrase = '/?keyphrase=' + encodedString;
	var baseUrl = location.host;
	
	$('input[name=lmstfy_link]').val('http://' + baseUrl + keyphrase);
	
	$('#intro_well').slideUp('slow', function() {
		$('#well').slideDown('slow');
	});

	$('input[name=lmstfy_link]').on('click', function() {
		$(this).select();
	});


}