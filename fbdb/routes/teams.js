var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/:id', function(req, res, next){

    var sql = `
    SELECT name as t_name FROM fbdb.team where idTeam = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get leagues."
            });
        }
        
        res.render('team', {
            title: result[0].t_name,
        });
    });
});

//SELECT * FROM fbdb.team where idTeam = 1;

router.get('/:id/profile', function(req, res, next){

    var sql = `
    SELECT idTeam as t_id, name as t_name, foundationYear as t_fy, stadium as t_stadium, logo as t_logo 
    FROM fbdb.team 
    WHERE idTeam = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get team profile."
            });
        }
        
        res.status(200).json(result[0]);
    });
});

router.get('/:id/players', function(req, res, next){

    var sql = `
    SELECT idPlayer as p_id, firstName as p_fname, lastName as p_lname, position as p_pos, birthDate as p_birthdate, image as p_image, number as p_number 
    FROM fbdb.player, fbdb.player_team 
    WHERE team = ? and fbdb.player.idPlayer = fbdb.player_team.player;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get players."
            });
        }
        
        res.status(200).json(result);
    });
});

module.exports = router;