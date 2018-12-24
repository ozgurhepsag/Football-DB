var express = require('express');
var router = express.Router();
var db = require('../../lib/db')

/* GET all rows */
router.get('/matches', function(req, res, next){
    var sql = `
        SELECT idMatch as id, season as season, round as round, league as l_id,
               homeTeam as t1_id, awayTeam as t2_id, homeScore as t1_score, awayScore as t2_score
        FROM fbdb.match;
    `;

    db.query(sql, function(error, result){
        if (error) {
            console.log(error);
            res.status(404).json({
                error: "Failed to get matches."
            });
        }
        
        res.status(200).json(result);
    });
});

/* GET single row */
router.get('/matches/:id', function(req, res, next){
    var sql = `
        SELECT idMatch as id, season as season, round as round, league as l_id,
               homeTeam as t1_id, awayTeam as t2_id, homeScore as t1_score, awayScore as t2_score
        FROM fbdb.match
        WHERE idMatch = ?; 
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get match."
            });
        }
        
        res.status(200).json(result[0]);
    });
});

/* POST team */
router.post('/matches', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.match(season, homeScore, awayScore, round, league, homeTeam, awayTeam)
        VALUES(?, ?, ?, ?, ?, ?, ?);
    `;

    db.query(sql, [req.body.season, req.body.homeScore, req.body.awayScore, req.body.round, req.body.league, req.body.homeTeam, req.body.awayTeam], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add match.',
            });
        } 
        createLog(req, 'CREATE');
        res.status(200).json({
            success: 'Match added successfully!'
        });   
    })
})

/* DELETE team */
router.delete('/matches/:id', function(req, res, next){
    var sql = `
        DELETE FROM fbdb.match
        WHERE idMatch = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to delete match.',
            });
        }
        createLog(req, 'DELETE');
        res.status(201).json({
            success: 'Match deleted successfully!'
        });
    });
});

/* UPDATE team */
router.put('/matches/:id', function(req, res, next){
    var sql = `
        UPDATE fbdb.match
        SET season = ?, homeScore = ?, awayScore = ?, round = ?, league = ?, homeTeam = ?, awayTeam = ?
        WHERE idMatch = ?;
    `;

    db.query(sql, [req.body.season, req.body.t1_score, req.body.t2_score, req.body.round, req.body.l_id, req.body.t1_id, req.body.t2_id, req.params.id], function(error, result){
        if(error){    
            console.log(error);
            res.status(404).json({
                error: 'Failed to update match.'
            });
        } 
        createLog(req, 'UPDATE');
        res.status(201).json({
            success: 'Match updated successfully!'
        });  
    });
})

function createLog(req, operation) {
    if (!req.user) return;

    var log = {
        user: req.user.idUser,
        related_table: 'match',
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