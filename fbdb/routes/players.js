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
    SELECT firstName as p_fname, lastName as p_lname, position as p_position, image as p_image, birthDate as p_bt, idPlayer as p_id, number as p_number, team as p_teamid, name as p_teamname
    FROM fbdb.player, fbdb.player_team, fbdb.team  
    WHERE idPlayer = ? and fbdb.player_team.player = fbdb.player.idPlayer and fbdb.player_team.team = fbdb.team.idTeam;
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

router.get('/:id/statistics', function(req, res, next){
    var sql = `
    SELECT season as s_season, goal as s_goal, assist as s_assist, name as s_team, team as s_teamid
    FROM fbdb.player_statistics, fbdb.team
    WHERE player = ? and idTeam = team
    ORDER BY season DESC;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get statistics."
            });
        }
        
        res.status(200).json(result);
    });
});

router.get('/:id/contracts', function(req, res, next){
    var sql = `
    SELECT t.name as c_teamname, pc.startDate as c_start, pc.endDate as c_end, pc.value as c_value, t.idTeam as c_teamid
    FROM fbdb.player_contract as pc, fbdb.team as t
    WHERE pc.team = t.idTeam and pc.player = ?
    ORDER BY c_end DESC;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get contracts."
            });
        }
        
        res.status(200).json(result);
    });
});


module.exports = router;