var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/src'));

app.get('/', function(request, response){
    response.render('index.html');
});

server.listen(8080, function(){
    console.log('- Server listening on port 8080');
});