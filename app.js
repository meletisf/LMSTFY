var express = require('express')
var googl = require('goo.gl')
var bodyParser = require('body-parser')
var broadcast = require('./broadcast')

var app = express()
var handlebars = require('express-handlebars').create({
	defaultLayout: 'main'
})

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', 3000)


app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', function(req, res) {
	res.render('home')
})

app.post('/short', function(req, res) {

	res.header('Content-type', 'application/json')
	if (!req.body.link) {
		res.send(JSON.stringify({
			status: false,
			message: 'Missing port parameter link'
		}))
	};

	if (!process.env.GOOGLKEY) {
		res.send(JSON.stringify({
			status: false,
			message: 'Goo.gl API Key parameter is missing.'
		}))
	};

	googl.setKey(process.env.GOOGLKEY)

	googl.shorten(req.body.link).then(function(link) {
		res.send(JSON.stringify({
			status: true,
			message: link
		}))
	}).catch(function(err) {
		res.send(JSON.stringify({
			status: false,
			message: err
		}))
	})

})

app.put('/broadcast', function(req, res) {
	
	if (!req.body.term) {
		res.send(JSON.stringify({
			status: false
		}))
	};

	res.send(broadcast.push({
		term: req.body.term
	}))

})

app.listen(app.get('port'), function() {
	console.log('LMSTFY started! Press Ctrl+C to exit.')
	console.log('goo.gl key used: ' + process.env.GOOGLKEY)
})
