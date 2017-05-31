/**
 * Created by BlackWolf on 05/20/17.
 */
var mysql = require('mysql');
var config = require('./config.json');

var connnection = mysql.createConnection({
    host    : process.env.DB_HOST || config.dbHost,
    user    : process.env.DB_USER || config.dbUser,
    password: process.env.DB_PASSWORD || config.dbPass,
    database: process.env.DB_DATABASE || config.dbDatabase
});

connnection.connect(function (error) {
    if (error){
        console.log(error);
        return;
    } else {
        console.log("Connected to " + config.dbHost + ":" + config.dbDatabase);
    }

});

module.exports = connnection
