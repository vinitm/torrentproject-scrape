var express = require('express');
var cloudscraper = require('cloudscraper');
var config = require('./config');
var querystring = require('querystring');
var app = express();
var fs = require('fs');
var DataExtracter = require('./modules/DataExtracter');

app.get('/', function(req, res) {
	var query = querystring.stringify(req.query);
	cloudscraper.get(config.url + '/?' + query, function(error, response, html) {
		if (error) {
			console.log(error);
			res.end();
		} else {
			DataExtracter.extractFrom(html).send(res);
		}
	});
});

app.get('/mock', function(req, res) {
	fs.readFile('./modules/mock.json', function(err, data) {
		if (err)
			console.log(err);
		else {
			res.setHeader('Content-Type', 'application/json');
			res.end(data);
		}
	});
});

app.listen(config.port, function() {
	console.log('Example app listening on port ' + config.port + '!');
});
