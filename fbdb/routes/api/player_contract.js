var express = require('express');
var router = express.Router();
var db = require('../../lib/db')

/* GET all rows */
router.get('/player_contracts', function(req, res, next){
    var sql = `
        SELECT C.idContract as c_id, C.startDate as c_start, C.endDate as c_end, C.value as c_value,
               P.firstName as p_fname, P.lastName as p_lname, P.idPlayer as p_id,
               T.name as t_name, T.idTeam as t_id
        FROM fbdb.player_contract as C, fbdb.player as P, fbdb.team as T
        WHERE C.player = P.idPlayer AND C.team = T.idTeam;
    `;

    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get contracts."
            });
        }
        res.status(200).json(result);
    });
});

/* GET single row */
router.get('/player_contracts/:id', function(req, res, next){
    var sql = `
        SELECT C.idContract as c_id, C.startDate as c_start, C.endDate as c_end, C.value as c_value,
            P.firstName as p_fname, P.lastName as p_lname, P.idPlayer as p_id,
            T.name as t_name, T.idTeam as t_id
        FROM fbdb.player_contract as C, fbdb.player as P, fbdb.team as T
        WHERE C.player = P.idPlayer AND C.team = T.idTeam AND C.idContract = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get contract."
            });
        }
        
        res.status(200).json(result[0]);
    });
});

/* POST player */
router.post('/player_contracts', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.player_contract(value, startDate, endDate, team, player)
        VALUES(?, ?, ?, ?, ?);
    `;

    db.query(sql, [req.body.value, req.body.startDate, req.body.endDate, req.body.team, req.body.player], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add contract.',
            });
        } 

        res.status(201).json({
            success: 'Contract added successfully!'
        });   
    })
})

/* DELETE player */
router.delete('/player_contracts/:id', function(req, res, next){
    var sql = `
        DELETE FROM fbdb.player_contract
        WHERE idContract = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to delete contract.',
            });
        }
        
        res.status(201).json({
            success: 'Contract deleted successfully!'
        });
    });
});

/* UPDATE player */
router.put('/player_contracts/:id', function(req, res, next){
    var sql = `
        UPDATE fbdb.player_contract
        SET startDate = ?, endDate = ?, value = ?, player = ?, team = ?
        WHERE idContract = ?;
    `;

    db.query(sql, [req.body.startDate, req.body.endDate, req.body.value, req.body.player, req.body.team, req.params.id], function(error, result){
        if(error){    
            console.log(error);
            res.status(404).json({
                error: 'Failed to update contract.'
            });
        } 
        res.status(201).json({
            success: 'Contract updated successfully!'
        });  
    });
})

module.exports = router;