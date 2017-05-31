var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('../config.json');

router.use("/countries", require('./api1/routes_countries'));
//router.use('/cities', require('./api1/routes_cities'));



module.exports = router;