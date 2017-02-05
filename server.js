/*

server.js for project forframe
Copyright 2017 by Dustin Pfister (GPL v3)
dustin.pfister@gmail.com

 */

var express = require('express'),
app = express(),
log = function (mess) {

    if (typeof mess === 'string') {

        console.log('server.js: ' + mess);

    } else {

        console.log(mess);

    }

};

// serve static files in the view folder
app.use(express.static('views'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('*', function (req, res, next) {

    log('path is ' + req.path);
    log('method: ' + req.method);
    next();

});

app.post('*', function (req, res) {

    require('./node_scripts/responder.js').respondTo(req, res);

});

// get from root path
app.get('/', function (req, res) {

    res.render('index.ejs');
});

// start the server.
app.listen(3000, function () {
    log('forframe is alive.');
});
