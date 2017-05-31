var express = require('express');
var router = express.Router();
var database = require('../../db_user');
var config = require('../../config.json');
var moment = require('moment');
var jwt = require('jwt-simple');

router.get("*", function(req, res, next){
    var username = req.get("username") || 0;
    var password = req.get("password") || 0;

    database.query(
        "SELECT * FROM user_creds WHERE username=?",
        [username],
        function(err, rows, fields){
            if(err)
                res.status(400).json(err);
            else{
                 if(checkPass(rows, password)){
                     console.log("user " + username + " succesfully logged in.");
                     res.status(200);
                     res.contentType('application/json');
                     res.json({"token":encodeToken(username)});
                 } else {
                     console.log("user " + username + " was not logged in.");
                     res.status(401).json({"msg": "not logged in"})
                 }
            }
        }

    )
})

var checkPass = function(rows, password) {
    for(var i = 0; i < rows.length; i++){
        if(rows[i].password == password) {
            return true;
        }
        console.log(rows[i].username + ", " + rows[i].password);
    }
    return false;
}

var encodeToken = function(username){
    const payload = {
        exp: moment().add(10, 'days').unix(),
        iat: moment().unix(),
        sub: username
    };
    return jwt.encode(payload, config.SECRETKEY);
}

module.exports = router;