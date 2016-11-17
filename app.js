var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var expressMysqlSession = require('express-mysql-session');
var pdfGeneration = require('./pdfGeneration.js');
var databaseOptions = require('./databaseOptions');

var app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(err) {
	if(err) {
		console.log('Error while statring server');
		return;
	}
	console.log('Server started at  http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.engine('.html', ejs.__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

var sessionStore = new expressMysqlSession(databaseOptions.mysqlServerInfo);

app.use(cookieParser('strongsecretcode'));
app.use(session({
	secret : 'strongsecretcodehere', 
    store : sessionStore,
    saveUninitialized : false,
    resave : false
}));

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/notice', function(req, res) {
    res.render('pages/notice');
});

app.get('/developer', function(req, res) {
    res.render('pages/developer');
});

app.get('/loginform', function(req, res) {
	if(req.session.userID) {
		res.redirect('form');
		return;
	}
    res.render('pages/loginform');
});

app.post('/loginform', function(req, res) {
	req.session.destroy(function(err) {
  		if(err) {
  			console.log('Error while destroying session');
  		}
  		//console.log('Destroyed session');
	});
	res.redirect('loginform');
})

app.get('/form', function(req, res) {
	if(req.session.userID) {
		pdfGeneration.serveForm(req.session.userID);
		res.render('pages/form', {userName : req.session.userName});
		return;	
	}
	res.redirect('loginform');
});

app.post('/form', function(req, res) {
	var id = req.body.id;
	var password = req.body.password;
	//console.log('From form %s %s', id, password);
	if(!id || !password) {
		res.redirect('loginform');
		return;
	}

	if(req.session.userID) {
		pdfGeneration.serveForm(req.session.userID);
		res.render('pages/form', {userName : req.session.userName});
		return;	
	}

	var idFromDatabase;
	var nameFromDatabase;
	
	function queryFromDatabase(callback) {
		var db = databaseOptions.createConnection;
		var connection = databaseOptions.connection;
		var sqlStatement = 'SELECT login.id, personal_info.name FROM `login` INNER JOIN `personal_info` ON login.id = personal_info.id WHERE login.id = ' + id + ' AND login.password = SHA(' + password + ')';
		db.query(sqlStatement, function(err, rows) {
			//db.end();
			if(err) {
				console.log(err.message);
				idFromDatabase =  0;
				nameFromDatabase = '';
				callback();
				return;
			}
			if(!rows.length) {
				//console.log('Rows length ' + rows.length);
				idFromDatabase = 0;
				nameFromDatabase = '';
				callback();
				return;
			}
			idFromDatabase =  rows[0].id;
			nameFromDatabase = rows[0].name;
			//console.log('Connected ID ' + idFromDatabase);
			callback();
		});
	}
	queryFromDatabase(function logMyNumber() {
		//console.log('The 0\'th ID %s Name %s', idFromDatabase, nameFromDatabase);
		if(idFromDatabase == id) {
			//console.log('From idFromDatabase ' + idFromDatabase);
			req.session.userID = idFromDatabase;
			req.session.userName = nameFromDatabase;
			//console.log('Session saved');
			pdfGeneration.serveForm(req.session.userID);
			res.render('pages/form', {userName : req.session.userName});
			return;
		}
		res.redirect('loginform');
		return;
	});
});

app.get(/.*.pdf$/, function(req, res) {
	if(req.session.userID) {
		var file = req.url;
		var path = __dirname + '/public/download' + file.substring(0, file.indexOf('.pdf')) + '(' + req.session.userID + ').pdf';
	  	res.sendFile(path);
	  	return;
  	}
  	res.redirect('loginform');
});

app.use(function(req, res) {
	res.status(404);
	res.render('pages/404');
});
