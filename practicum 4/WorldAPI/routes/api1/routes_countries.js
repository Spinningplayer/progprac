var express = require('express');
var router = express.Router();
var config = require('../../config.json');
var path = require('path');
var database = require('../../mysql');

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

module.exports = router;