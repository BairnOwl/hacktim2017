var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

var engines = require('consolidate');

var bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use(express.static(__dirname + '/views'));
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('*', function(request, response){
    response.render('index.html');
});

app.post('/image', function(req, res) {
	var image = req.body.image;

	console.log(image);
});

server.listen(8080, function(){
    console.log('- Server listening on port 8080');
});