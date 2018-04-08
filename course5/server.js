const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3831 ;

 
/**
 * app.listen() express doc
 * The app returned by express() is in fact a JavaScript Function, designed to be passed to Node’s HTTP servers as a callback to handle requests. This makes it easy to provide both HTTP and HTTPS versions of your app with the same code base, as the app does not inherit from these (it is simply a callback):
 * 
 * var express = require('express');
 * var https = require('https');
 * var http = require('http');
 * var app = express();
 * http.createServer(app).listen(80);
 * https.createServer(options, app).listen(443);
 * 
*/
const server = http.createServer(app);



server.listen(port);