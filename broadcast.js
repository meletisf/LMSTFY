var Pusher = require('pusher')

var pusher = new Pusher({
	appId: process.env.PUSHER_ID,
	key: '911e52fc7315a9995c59',
	secret: process.env.PUSHER_SECRET,
	encrypted: true
});

module.exports = {
	push: function(payload) {

		pusher.trigger('links', 'new_link', payload)

		return JSON.stringify({
			status: true
		})

	}
}