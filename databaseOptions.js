var mysql = require('mysql');

var options = {
	host : '127.0.0.1',
	user : 'root',
	password : '',
	database : 'registration'
};

var db = mysql.createConnection(options);

var connection =  db.connect(function(err) {
	if(err) {
		// db.end();
		console.log(err.message);
		return;
	}
	//console.log('Connected to database successfully');
});

// var endConnection = db.end(function() {
// 	console.log('Database connection ended');
// });

module.exports = {
	'mysqlServerInfo' : options,
	'createConnection' : db,
	'connection' : connection
	// 'endConnection' : endConnection
};
