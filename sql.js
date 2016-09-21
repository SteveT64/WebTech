var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'playlists'
});
module.exports = {
	connectDb: function(){
		connection.connect();
	},
	allLabels: function(callback){
		connection.query('SELECT label from items', function(err, rows, fields) {
			if (err) callback(err, null);
			var data = [];
			for (x in rows) {
				data.push(rows[x].label);
			}
			callback(null, data);
		});
	},
	createPlaylist: function(data, callback){
		var query = mysql.format("INSERT INTO items (label, playlist) VALUES (?, ?)",data);
		connection.query(query, function(err) {
			if (err) callback(err, null);
			callback(null, 'Success');
		});
	},
	loadPlaylist: function(data, callback){
		var query = mysql.format("select * from items where label =?",data);
		connection.query(query, function(err,rows,fields) {
			if (err) callback(err, null);
			console.log(rows)
			callback(null,rows[0].playlist );
		});
	},
	disconnectDb: function(){
		connection.end();
	}
}