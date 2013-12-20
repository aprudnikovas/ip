var express = require('express')
	, http = require('http')
	, path = require('path')
	, routes = require('./server/routes/init');

var app = express();

// CONFIGURE APP
////////////////////////////////

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/client-prod');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.favicon(path.join(__dirname, 'client-prod/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('987a6s865d98as867d09dv0s9d60g6d09g6f9'));
app.use(express.session());
app.use(express.csrf());
app.use(function (req, res, next) {
	res.locals.token = req.session._csrf;
	next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client-prod')));
app.use(function (req, res, next) {
	res.status(404);
	if (req.accepts('html')) {
		res.render('404.html');
		return;
	}
	if (req.accepts('json')) {
		res.send({ error : 'Not found' });
		return;
	}
	res.type('txt').send('Not found');
});
app.use(function (err, req, res, next) {
	console.log('ERROR:500: ' +
		new Date() +
		'; REQUEST URL: ' +
		req.url +
		'; REQUEST QUERY: ' + JSON.stringify(req.query) +
		'; STACKTRACE: ' + err.stack
	);
	res.status(500);
	res.render('500.html');
});

// INIT ADDITIONAL CONFIG
////////////////////////////////

routes.init(app);

// CONNECT
////////////////////////////////

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});


