var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('../config');
var database = require('../mysql');
var userDatabase = require('../db_user');

router.use("/countries", require('./api1/routes_countries'));
router.use("/city", require('./api1/routes_cities'));
router.use("/login", require('./api1/routes_login'));

router.get("/search?", function(req, res, next){
    var type = req.query.type;
    var continent = req.query.continent;
    var amount = parseInt(req.query.amount);
    database.query(
        "SELECT * FROM country WHERE continent=? LIMIT ?",
        [continent, amount],
        function(error, rows, fields) {
            if (error)
                res.status(400).json(error);
            else{
                res.status(200);
                res.contentType("application/json");
                res.json(rows);
            }
        }
    )
})

router.get("/register", function(req, res, next){
    var username = req.query.username;
    var password = req.query.password;
    console.log(username + ", " + password);
    if(username != null && password != null) {
        userDatabase.query(
            "INSERT INTO user_creds (username, password) VALUES (?,?)",
            [username, password],
            function (err, rows, fields) {
                if(err)
                    res.status(400).json(err);
                else {
                    res.status(200);
                    res.contentType('application/json');
                    res.json({"msg": "username and password succesfully registered!"});
                }
            }
        )
    } else {
        res.status(400);
        res.contentType('application/json');
        res.json({"msg": "username or password missing."});
    }
})

module.exports = router;