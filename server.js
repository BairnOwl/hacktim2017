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

	var spawn = require('child_process').spawn,
    py = spawn('python', ['compute_input.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';

    py.stdout.on('data', function(data){
	  dataString += data.toString();
	});

	/*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
	py.stdout.on('end', function(){
	  console.log('Sum of numbers=',dataString);
	});

	py.stdin.write(JSON.stringify(data));

	py.stdin.end();
});

server.listen(8080, function(){
    console.log('- Server listening on port 8080');
});