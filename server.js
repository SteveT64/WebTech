var db = require('./sql.js');
db.connectDb();
var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);
var bodyParser = require('body-parser');

app.use(express.static(__dirname/* + '/j'*/));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/labels', function(req, res) {
	db.allLabels(function(err, data) {
		if (err) {
			console.log(err);
		} else {
			res.send(data);
		}
	});
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/save-playlist', function(req, res) {
	var data = [req.body.label, req.body.playlist];
	db.createPlaylist(data, function(err, data) {
		if (err) {
			console.log(err);
		} else {
			res.send("Success")
		}
	});
});

app.post('/load-playlist', function(req, res) {
	console.log("LOAD");
	var data = [req.body.label];
	db.loadPlaylist(data, function(err, data) {
		if (err) {
			console.log(err);
		} else {
			res.send(data);
		}
	});
});


app.listen(3000);

