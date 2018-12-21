var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/:id/', function(req, res, next){
    var sql = `
    SELECT firstName as p_fname, lastName as p_lname 
    FROM fbdb.player 
    WHERE idPlayer = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get players."
            });
        }
        
        res.render('player', {
            title: "Player - " + result[0].p_fname + " " + result[0].p_lname,
        });
    });
});

router.get('/:id/profile', function(req, res, next){
    var sql = `
    SELECT firstName as p_fname, lastName as p_lname, position as p_position, image as p_image, birthDate as p_bt, idPlayer as p_id, number as p_number
    FROM fbdb.player, fbdb.player_team 
    WHERE idPlayer = ? and fbdb.player_team.player = fbdb.player.idPlayer;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get profile."
            });
        }
        
        res.status(200).json(result[0]);
    });
});

module.exports = router;