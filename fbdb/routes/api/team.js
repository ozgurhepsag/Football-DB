var express = require('express');
var router = express.Router();
var db = require('../../lib/db')

/* GET all teams */
router.get('/teams', function(req, res, next){
    var sql = `
        SELECT idTeam as t_id, name as t_name, foundationYear as t_year,
               stadium as t_stadium, logo as t_logo, color1 as t_color1, 
               color2 as t_color2, league as l_id
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
               color2 as t_color2, league as l_id
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
        INSERT INTO fbdb.team(name, foundationYear, stadium, logo, color1, color2, league)
        VALUES(?, ?, ?, ?, ?, ?, ?);
    `;

    db.query(sql, [req.body.name, req.body.foundation, req.body.stadium, req.body.logo, req.body.color1, req.body.color2, req.body.league], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add team.',
            });
        } 

        res.status(200).json({
            success: 'Team added successfully!'
        });   
    })
})

module.exports = router;