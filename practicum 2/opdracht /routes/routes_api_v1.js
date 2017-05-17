//api version 1
var express = require('express');
var router = express.Router();
var path = require('path');

router.get("*", function(req, res) {
   res.status(200);
   res.json({"msg":"cookbook REST api v1 wordt niet meer ondersteund"});
});

module.exports = router;