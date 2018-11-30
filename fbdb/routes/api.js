var express = require('express');
var router = express.Router();
var db = require('../lib/db')

/* GET country */
router.get('/countries', function(req, res, next){
    var sql = "SELECT * FROM fbdb.country;"
    db.query(sql, function(err, result){
        if(err){
            res.status(404).json({
                message: 'Failed to add country.',
            });
        } else{
            var countries = [];
            for(let i=0; i<result.length; i++){
                countries.push({
                    idCountry: result[i].idCountry,
                    name: result[i].name,
                    flag: result[i].flag,
                });
            }
            res.status(200).json({
                message: 'Post fetched successfully!',
                countries: countries
            });
        }
    });    
});
/* POST country */
router.post('/countries', function(req, res, next){
    console.log(req.body.name);
    var sql = "INSERT INTO fbdb.country (name) VALUES('" + req.body.name + "');"
    db.query(sql, function(err, result){
        if(err){
            console.log("Failed to add country");
            res.status(404).json({
                message: 'Failed to add country.',
            });
        } else{
            console.log("Added country");
            res.status(201).json({
                message: 'Post added successfully!',
            });
        }
    });    
});


module.exports = router;
