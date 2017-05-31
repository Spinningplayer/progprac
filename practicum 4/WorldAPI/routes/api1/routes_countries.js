var express = require('express');
var router = express.Router();
var config = require('../../config.json');
var path = require('path');
var database = require('../../mysql');
var jwt = require('jwt-simple');
var moment = require('moment');

router.all("*", function(req, res, next){
    var token = req.get("token") || 0;
    var username =req.get("username") || 0;
    if (decodeToken(token, username)){
        next();
    } else {
        res.status(401);
        res.contentType('application/json');
        res.json({"msg": "invalid token"});
    }
})

router.get("/:number", function(req, res, next) {
    var number = parseInt(req.params.number) - 1 || 0;
    database.query('SELECT * FROM country;', function(error, rows, fields){
            if(error)
                res.status(400).json(error);
            else {
                res.status(200);
                res.contentType('application/json');
                res.json(rows[number]);
            }
    })
})

router.post("/add?", function(req, res, next){
    var name = req.get('name');
    var code = req.get('code');
    var continent = req.get('continent');
    database.query(
        'INSERT INTO country (code, name, continent) VALUES(?, ?, ?)',
        [code, name, continent],
        function(error, rows, fields){
        if(error)
            res.status(400).json(error);
        else {
            res.status(200);
            res.contentType('application/json');
            res.json({"msg" : "country succesfully added"});
        }
    })
})

router.delete("/:number", function(req, res, next){
  var number = parseInt(req.params.number) || 0;
  database.query('SELECT * FROM country', function(error, rows, fields){
      if(error)
          res.status(400).json(error);
      else{
          var country = rows[number].Name;
          database.query(
              'DELETE FROM country WHERE Name=?',
              [country],
              function(error, rows, fields){
                if(error)
                    res.status(400).json(error);
                else{
                    res.status(200);
                    res.contentType('application/json');
                    res.json({"msg" : "country succesfully deleted"});
                }
          })
      }
  })
})

router.put("/update?", function(req, res, next){
    var countryCode = req.get('code') || 0;
    var name = req.get("name") || 0;
    var continent = req.get("continent") || 0;
    console.log(countryCode + ", " + name + ", " + continent);

    database.query(
        'UPDATE country SET name=?, continent=? where code=?;',
        [name, continent, countryCode],
        function(error, rows, fields){
            if(error)
                res.status(400).json(error);
            else{
                res.status(200);
                res.contentType('application/json');
                res.json({"msg":"record updated succesfully"});
            }
        })
})

router.get("*", function(req, res, next){
  database.query('SELECT * FROM country;', function(error, rows, fields){
      if(error)
          res.status(400).json(error);
      else {
          res.status(200);
          res.contentType('application/json');
          res.json(rows);
      }
  })
})

var decodeToken = function(token, username) {
    try{
        const payload = jwt.decode(token, config.SECRETKEY);

        const now = moment().unix();

        if(now > payload.exp) {
            console.log("token has expired.");
            return false;
        } else {
            return true;
        }
        if(username == payload.sub) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false
    }
}

module.exports = router;