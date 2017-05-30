/**
 * Created by thijs on 5/30/17.
 */
var express = require('express');
var router = express.Router();
var database = require('../../db_user');

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
                     res.json({"msg":"succesfully logged in."});
                 } else {
                     console.log("user " + username + " was not logged in.");
                     res.status(401).json({"msg":"unauthorised log in"})
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

module.exports = router;