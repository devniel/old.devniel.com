require('dotenv').config()

var express = require('express');
var http = require('http');
var path = require('path');
var bunyan = require('bunyan');

/**
 * debr - devniel's express boilerplate for react.js
 * @author : Daniel (devnieL) Flores
 * 2017
*/

global.version = "0.0.1";
global.rootDirectory = path.resolve(__dirname);

// Log 

var log = bunyan.createLogger({
	name : "engine",
	level : "debug",
	serializers : {
		metadata : function(metadata) {
			return JSON.stringify(metadata);
		},
		params : function(params) {
			return JSON.stringify(params);
		},
		db_results : function(db_results){
			return JSON.stringify(db_results);
		}
	}
});

global.log = log;

var _log = log.child({module : "server.js"});

// Set app
var app = express();

require("./config/express")(app);

// Start the app by listening on port
var port = process.env.PORT || 3000;

// Log events
console.log("React project started on port: " + port);

// Start server
var server = http.createServer(app);
server.listen(port);

// Expose app for testing
exports = module.exports.app = server;
