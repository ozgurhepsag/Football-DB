var express = require('express');
var router = express.Router();
var db = require('../../lib/db');

/* GET all countries */
router.get('/countries', function(req, res, next){
    var sql = `
        SELECT C.idCountry as c_id, C.name as c_name, C.flag as c_flag
        FROM fbdb.country as C;
    `;
    db.query(sql, function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to fetch countries.',
            });
        } 
        res.status(200).json(result);   
    });    
});

/* GET single country */
router.get('/countries/:id', function(req, res, next){
    var sql = `
        SELECT C.idCountry as c_id, C.name as c_name, C.flag as c_flag
        FROM fbdb.country as C
        WHERE C.idCountry = ?;
    `;
    db.query(sql, [req.params.id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to fetch country.',
            });
        } 
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({
                error: 'Country doesn\'t exist.',
            });
        }
            
    });    
});

/* POST country */
router.post('/countries', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.country(name, flag)
        VALUES(?, ?);
    `;
    db.query(sql, [req.body.name, req.body.flag], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add country.',
            });
        } 
        
        createLog(req, 'CREATE');
        res.status(200).json({
            success: 'Country added successfully!'
        });   
    });    
});

/* DELETE country */
router.delete('/countries/:id', function(req, res, next){
    var sql = `
        DELETE FROM fbdb.country
        WHERE idCountry = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to delete country.',
            });
        }
        
        createLog(req, 'DELETE');
        res.status(201).json({
            success: 'Country deleted successfully!'
        });
        
    });    
});

/* UPDATE country */
router.put('/countries/:id', function(req, res, next){
    var sql = `
        UPDATE fbdb.country
        SET name = ?, flag = ?
        WHERE idCountry = ?;
    `;
    db.query(sql, [req.body.name, req.body.flag, req.body.idCountry], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add country.'
            });
        } 

        createLog(req, 'UPDATE');
        res.status(201).json({
            success: 'Country updated successfully!'
        });     
    });    
});

function createLog(req, operation) {
    if (!req.user) return;

    var log = {
        user: req.user.idUser,
        related_table: 'country',
        operation: operation,
        date: new Date()
    }

    var sql = `
        INSERT INTO fbdb.log(user, related_table, operation, date)
        VALUES (?, ?, ?, ?);
    `

    db.query(sql, [log.user, log.related_table, log.operation, log.date], function(error, result){
        if (error) return;
    });
}

module.exports = router;
