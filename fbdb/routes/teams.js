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

router.get('/:id/match_history', function(req, res, next){

    var sql = `
    SELECT m.round as m_round, ht.name as m_htname, m.homeScore as m_hscore, m.awayScore as m_ascore, awt.name as m_atname, m.homeTeam as m_homeid, m.awayTeam as m_awayid
    FROM fbdb.match as m, fbdb.team as ht, fbdb.team as awt
    WHERE ht.idTeam = m.homeTeam and awt.idTeam = m.awayTeam and m.season = 2018 and (m.homeTeam = ? or m.awayTeam = ?)
    order by round DESC;
    `;

    db.query(sql, [req.params.id, req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get matches."
            });
        }
        res.status(200).json(result);
    });
});

router.get('/:id/trophies', function(req, res, next){

    var sql = `
    SELECT tt.idTrophy as tr_id, tt.season as tr_season, t.name as tr_teamname, l.name as tr_league, l.idLeague as tr_leagueid
    FROM fbdb.team_trophies as tt, fbdb.team as t, fbdb.league as l
    WHERE t.idTeam = tt.team and t.league = l.idLeague and t.idTeam = ?
    ORDER BY tt.season DESC;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get matches."
            });
        }

        res.status(200).json(result);
    });
});

module.exports = router;