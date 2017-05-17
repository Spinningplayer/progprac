var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('../config.json');
var recipes = require('../recipes');

router.get("/info", function(req, res){
    res.status(200);
    res.json({"description":"de cookbook api levert een ruim assortiment aan recepten"});
});

router.get("/version", function(req, res){
    res.status(200);
    res.contentType("application/json");
    res.json({"version":config.version});
});

router.get("/recipes", function(req, res) {
    var category = req.query.category || '';
    var outputData;

    console.log(category);
    console.log(typeof category);

    res.status(200);
    res.contentType("application/json");

    if (req.query.category =! null) {
        outputData = recipes.filter(function (recipe) {
            return recipe.category == category;

        });
        res.json(outputData);
        console.log("trigger 1");
    } else {
        res.json(recipes);
        console.log("trigger 2");
    }
});

router.get("/recipes/:number", function (req, res) {
    var recipe = parseInt(req.params.number) - 1 || 0;
    res.status(200);
    res.contentType("application/json");
    res.json(recipes[recipe]);
});

router.all("*", function(req, res, next) {
    res.status(404);
    res.contentType("application/json");
    res.json({"msg":"page not found"});
});

module.exports = router;