var express = require('express');
var router = express.Router();
var db = require('../../lib/db');

/* GET all leagues */
router.get('/leagues', function(req, res, next){
    var sql = `
        SELECT L.idLeague as l_id, L.name as l_name, C.idCountry as c_id, C.name as c_name, C.flag as c_flag 
        FROM fbdb.league as L, fbdb.country as C 
        WHERE country=idCountry;
    `;
    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get leagues."
            });
        }
        
        res.status(200).json(result);
    });
});

/* GET single league */
router.get('/leagues/:id', function(req, res, next){
    var sql = `
        SELECT L.idLeague as l_id, L.name as l_name, C.idCountry as c_id, C.name as c_name, C.flag as c_flag 
        FROM fbdb.league as L, fbdb.country as C 
        WHERE L.country=C.idCountry AND L.idLeague=?;
    `;
    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get league."
            });
        }
        res.status(200).json(result[0]);
    });
});

/* POST league */
router.post('/leagues', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.league(name, country)
        VALUES(?, ?);
    `;

    db.query(sql, [req.body.l_name, req.body.c_id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add league.',
            });
        } 

        res.status(200).json({
            success: 'League added successfully!'
        });   
    });
});

/* DELETE league */
router.delete('/leagues/:id', function(req, res, next){
    var sql = `
        DELETE FROM fbdb.league
        WHERE idLeague = ?;
    `;
    db.query(sql, [req.params.id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to delete league.',
            });
        }
        
        res.status(201).json({
            success: 'League deleted successfully!'
        });
    })
});

/* UPDATE league */
router.put('/leagues/:id', function(req, res, next){
    var sql = `
        UPDATE fbdb.league
        SET name = ?, country = ?
        WHERE idLeague = ?;
    `;
    db.query(sql, [req.body.l_name, req.body.c_id, req.body.l_id], function(error, result){
        if(error){    
            res.status(404).json({
                error: 'Failed to add league.'
            });
        } 
        res.status(201).json({
            success: 'League updated successfully!'
        });  
    })
})

module.exports = router;