var express = require('express');
var router = express.Router();
var db = require('../../lib/db')

/* GET all countries */
router.get('/countries', function(req, res, next){
    var sql = "SELECT * FROM fbdb.country;"
    db.query(sql, function(err, result){
        if(err){
            res.status(404).json({
                message: 'Failed to fetch countries.',
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
                message: 'Countries fetched successfully!',
                countries: countries
            });
        }
    });    
});

/* GET single country */
router.get('/countries/:id', function(req, res, next){
    var sql = "SELECT * FROM fbdb.country WHERE idCountry='" + req.params.id +"';";
    console.log(sql);
    db.query(sql, function(err, result){
        if(err){
            res.status(404).json({
                message: 'Failed to fetch country.',
            });
        } else{
            var country = {
                idCountry: result[0].idCountry,
                name: result[0].name,
                flag: result[0].flag,
            };
            res.status(200).json({
                message: 'Country fetched successfully!',
                country: country
            });
        }
    });    
});

/* POST country */
router.post('/countries', function(req, res, next){
    var sql = "INSERT INTO fbdb.country (name, flag) VALUES('" + req.body.name + "', '" + req.body.flag + "');"
    db.query(sql, function(err, result){
        if(err){
            res.status(404).json({
                message: 'Failed to add country.',
                error: err
            });
        } else{
            res.status(201).json({
                message: 'Country added successfully!',
            });
        }
    });    
});

/* DELETE country */
router.delete('/countries/:id', function(req, res, next){
    var sql = "DELETE FROM fbdb.country WHERE idCountry='" + req.params.id +"';"
    db.query(sql, function(err, result){
        if(err){
            res.status(404).json({
                message: 'Failed to delete country.',
            });
        } else{
            res.status(201).json({
                message: 'Deleted country successfully!',
            });
        }
    });    
});

/* UPDATE country */
router.put('/countries/:id', function(req, res, next){
    var country = {
        idCountry: req.body.idCountry,
        name: req.body.name,
        flag: req.body.flag
    }
    var sql = "UPDATE fbdb.country SET name = '"+ country.name + "', flag = '" + country.flag + "' WHERE idCountry = '"+ country.idCountry +"';";
    db.query(sql, function(err, result){
        if(err){
            res.status(404).json({
                message: 'Failed to add country.',
            });
        } else{
            res.status(201).json({
                message: 'Country updated successfully!',
                country: country
            });
        }
    });    
});

module.exports = router;
