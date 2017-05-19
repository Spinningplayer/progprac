var http = require('http');
var express = require('express');
var config = require('./config.json');

var app = express();

app.all('*', function(req, res, next){
    console.log(req.method + " " + req.url);
    next();
});


app.use("/api/v1", require('./routes/routes_api_v1'));

app.listen(config.PORT, function(){
    console.log("Server started on " + config.PORT);
});

module.exports = app;
