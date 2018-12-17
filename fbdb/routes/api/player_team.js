var express = require('express');
var router = express.Router();
var db = require('../../lib/db')

/* GET all rows */
router.get('/player_team', function(req, res, next){
    var sql = `
        SELECT PT.number, PT.team as t_id, PT.player as p_id, P.firstName as p_fname, P.lastName as p_lname, T.name as t_name
        FROM fbdb.player_team as PT, fbdb.player as P, fbdb.team as T
        WHERE PT.team = T.idTeam AND PT.player = P.idPlayer;
    `;

    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get row."
            });
        }
        
        res.status(200).json(result);
    });
});

/* POST player */
router.post('/player_team', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.player_team(number, team, player)
        VALUES(?, ?, ?);
    `;

    db.query(sql, [req.body.number, req.body.team, req.body.player], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add row.',
            });
        } 

        res.status(201).json({
            success: 'Row added successfully!'
        });   
    })
})

/* DELETE player */
router.delete('/player_team/', function(req, res, next){
    var sql = `
        DELETE FROM fbdb.player_team
        WHERE number = ? AND team = ? AND player = ?;
    `;

    db.query(sql, [req.body.number, req.body.team, req.body.player], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to delete row.',
            });
        }
        
        res.status(201).json({
            success: 'Row deleted successfully!'
        });
    });
});

module.exports = router;