var express = require('express');
var router = express.Router();
var db = require('../../lib/db')

/* GET all teams */
router.get('/teams', function(req, res, next){
    var sql = `
        SELECT idTeam as t_id, name as t_name, foundationYear as t_year,
               stadium as t_stadium, logo as t_logo, color1 as t_color1, 
               color2 as t_color2, manager as m_id, league as l_id
        FROM fbdb.team; 
    `;

    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get teams."
            });
        }
        
        res.status(200).json(result);
    });
});

/* GET single team */
router.get('/teams/:id', function(req, res, next){
    var sql = `
        SELECT idTeam as t_id, name as t_name, foundationYear as t_year,
               stadium as t_stadium, logo as t_logo, color1 as t_color1, 
               color2 as t_color2, manager as m_id, league as l_id
        FROM fbdb.team
        WHERE idTeam = ?; 
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get teams."
            });
        }
        
        res.status(200).json(result[0]);
    });
});

/* POST team */
router.post('/teams', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.team(name, foundationYear, stadium, logo, color1, color2, manager, league)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?);
    `;

    db.query(sql, [req.body.name, req.body.foundation, req.body.stadium, req.body.logo, req.body.color1, req.body.color2, req.body.manager, req.body.league], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add team.',
            });
        } 
        createLog(req, "CREATE");
        res.status(200).json({
            success: 'Team added successfully!'
        });   
    })
})

/* DELETE team */
router.delete('/teams/:id', function(req, res, next){
    var sql = `
        DELETE FROM fbdb.team
        WHERE idTeam = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to delete team.',
            });
        }
        createLog(req, "DELETE");
        res.status(201).json({
            success: 'Team deleted successfully!'
        });
    });
});

/* UPDATE team */
router.put('/teams/:id', function(req, res, next){
    var sql = `
        UPDATE fbdb.team
        SET name = ?, foundationYear = ?, stadium = ?, logo = ?,
            color1 = ?, color2 = ?, manager = ?, league = ?
        WHERE idTeam = ?;
    `;

    db.query(sql, [req.body.name, req.body.foundation, req.body.stadium, req.body.logo, req.body.color1, req.body.color2, req.body.manager, req.body.league, req.body.id], function(error, result){
        if(error){    
            console.log(error);
            res.status(404).json({
                error: 'Failed to update team.'
            });
        } 
        createLog(req, "UPDATE");
        res.status(201).json({
            success: 'Team updated successfully!'
        });  
    });
})

function createLog(req, operation) {
    if (!req.user) return;

    var log = {
        user: req.user.idUser,
        related_table: 'team',
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