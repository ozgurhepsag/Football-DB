var express = require('express');
var router = express.Router();
var db = require('../../lib/db')

/* GET all rows */
router.get('/player_statistics', function(req, res, next){
    var sql = `
        SELECT PS.idStatistics s_id, PS.season as s_season, PS.assist as s_assist, PS.goal as s_goal,
               PS.player as p_id, P.firstName as p_fname, P.lastName as p_lname,
               PS.team as t_id, T.name as t_name,
               PS.league as l_id, L.name as l_name
        FROM fbdb.player_statistics as PS, fbdb.player as P, fbdb.team as T, fbdb.league as L
        WHERE PS.player = P.idPlayer AND PS.team = T.idTeam AND PS.league = L.idLeague;
    `;

    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get statistics."
            });
        }
        
        res.status(200).json(result);
    });
});

/* GET single row */
router.get('/player_statistics/:id', function(req, res, next){
    var sql = `
        SELECT PS.idStatistics s_id, PS.season as s_season, PS.assist as s_assist, PS.goal as s_goal,
            PS.player as p_id, P.firstName as p_fname, P.lastName as p_lname,
            PS.team as t_id, T.name as t_name,
            PS.league as l_id, L.name as l_name
        FROM fbdb.player_statistics as PS, fbdb.player as P, fbdb.team as T, fbdb.league as L
        WHERE PS.idStatistics = ? AND PS.player = P.idPlayer AND PS.team = T.idTeam AND PS.league = L.idLeague;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get statistic."
            });
        }
        res.status(200).json(result[0]);
    });
});

/* POST player */
router.post('/player_statistics', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.player_statistics(season, assist, goal, player, team, league)
        VALUES(?, ?, ?, ?, ?, ?);
    `;

    db.query(sql, [req.body.season, req.body.assist, req.body.goal, req.body.player, req.body.team, req.body.league], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add row.',
            });
        } 
        createLog(req, 'CREATE');
        res.status(201).json({
            success: 'Row added successfully!'
        });   
    })
})

/* DELETE player */
router.delete('/player_statistics/:id', function(req, res, next){
    var sql = `
        DELETE FROM fbdb.player_statistics
        WHERE idStatistics = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to delete row.',
            });
        }
        createLog(req, 'DELETE');
        res.status(201).json({
            success: 'Row deleted successfully!'
        });
    });
});

/* UPDATE player */
router.put('/player_statistics/:id', function(req, res, next){
    var sql = `
        UPDATE fbdb.player_statistics
        SET season = ?, assist = ?, goal = ?, player = ?, team = ?, league = ?
        WHERE idStatistics = ?;
    `;

    db.query(sql, [req.body.season, req.body.assist, req.body.goal, req.body.player, req.body.team, req.body.league, req.params.id], function(error, result){
        if(error){    
            console.log(error);
            res.status(404).json({
                error: 'Failed to update player.'
            });
        } 
        createLog(req, 'UPDATE');
        res.status(201).json({
            success: 'Player updated successfully!'
        });  
    });
})

function createLog(req, operation) {
    if (!req.user) return;

    var log = {
        user: req.user.idUser,
        related_table: 'player_statistic',
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