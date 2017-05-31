var express = require('express');
var router = express.Router();
var config = require('../../config.json');
var path = require('path');

router.get("/:number", function(req, res, next) {
    var number = parseInt(req.params.number) || 0;
    console.log(number);
    res.status(200);
    res.contentType('application/json');
    res.json({"input" : number});
})

module.exports = router;