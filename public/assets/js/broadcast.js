var pusher = new Pusher('911e52fc7315a9995c59', {
    encrypted: true
});

var channel = pusher.subscribe('links');

channel.bind('new_link', function(data) {
	
	$('#live_panel').slideDown('slow', function() {
		$('#feed_container').prepend(
			'<li class="list-group-item"><a href="https://www.skroutz.gr/search?keyphrase=' + encodeURIComponent(data.term) + '">' + data.term +'</a></li>'
		).show('slow');
	});

});

function broadcast() {

	var getTerm = $('input[id=search_bar_input]').val();

	$.ajax({
		type: "PUT",
		url: "/broadcast",
		data: {
			term: getTerm
		}
	})

}