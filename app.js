var express = require('express')

var app = express()
var handlebars = require('express-handlebars').create({
	defaultLayout: 'main'
})

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', 3000)
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
	res.render('home')
})

// app.listen(app.get('port'), function() {
// 	console.log('LMSTFY started! Press Ctrl+C to exit.')
// })

app.listen(app.get('port'), "lmstfy.ga")