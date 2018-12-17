var express = require('express');
var router = express.Router();
var db = require('../../lib/db')

/* GET all rows */
router.get('/players', function(req, res, next){
    var sql = `
        SELECT idPlayer as p_id, firstName as p_fname, lastName as p_lname, position as p_position,
               birthDate as p_bdate, image as p_img
        FROM fbdb.player;
    `;

    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get players."
            });
        }
        
        res.status(200).json(result);
    });
});

/* GET single row */
router.get('/players/:id', function(req, res, next){
    var sql = `
        SELECT idPlayer as p_id, firstName as p_fname, lastName as p_lname, position as p_position,
               birthDate as p_bdate, image as p_img
        FROM fbdb.player
        WHERE idPlayer = ?; 
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get player."
            });
        }
        
        res.status(200).json(result[0]);
    });
});

/* POST player */
router.post('/players', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.player(firstName, lastName, position, birthDate, image)
        VALUES(?, ?, ?, ?, ?);
    `;

    db.query(sql, [req.body.firstName, req.body.lastName, req.body.position, req.body.birthDate, req.body.image], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add player.',
            });
        } 

        res.status(201).json({
            success: 'Player added successfully!'
        });   
    })
})

/* DELETE player */
router.delete('/players/:id', function(req, res, next){
    var sql = `
        DELETE FROM fbdb.player
        WHERE idPlayer = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to delete player.',
            });
        }
        
        res.status(201).json({
            success: 'Player deleted successfully!'
        });
    });
});

/* UPDATE player */
router.put('/players/:id', function(req, res, next){
    var sql = `
        UPDATE fbdb.player
        SET firstName = ?, lastName = ?, position = ?, birthDate = ?, image = ?
        WHERE idPlayer = ?;
    `;

    db.query(sql, [req.body.firstName, req.body.lastName, req.body.position, req.body.birthDate, req.body.image, req.params.id], function(error, result){
        if(error){    
            console.log(error);
            res.status(404).json({
                error: 'Failed to update player.'
            });
        } 
        res.status(201).json({
            success: 'Player updated successfully!'
        });  
    });
})

module.exports = router;