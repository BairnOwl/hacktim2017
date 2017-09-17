var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

var engine = require('consolidate');

var bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use(express.static(__dirname + '/views'));
app.engine('html', engine.mustache);
app.set('view engine', 'html');


app.get('*', function(request, response){
    response.render('index.html');
});

app.post('/image', function(req, res) {
	var image = req.body.image;

	// console.log(image);

	var spawn = require('child_process').spawn,
    py = spawn('python3', ['vision.py']);
    // data = [1,2,3,4,5,6,7,8,9],
    // dataString = '';

    py.stdout.on('data', function(data){
	  console.log(data.toString());

	  io.emit('addFood', data.toString());
	});


	/*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
	py.stdout.on('end', function(){
	  console.log('end');
	});

	py.stdin.write(JSON.stringify(image));

	py.stdin.end();
});

server.listen(8080, function(){
    console.log('- Server listening on port 8080');
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
});