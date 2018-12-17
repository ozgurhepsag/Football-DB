var express = require('express');
var router = express.Router();
var db = require('../lib/db');


router.get('/', function(req, res, next){
    res.render('league', {
        title: 'Leagues',
    });
});

router.get('/:id/teams', function(req, res, next){
    res.render('league_teams', {
        title: 'Teams',
    });
});

/*GET teams of the desired league*/
router.get('/:id/teams/list', function(req, res, next){

    var sqlTeam = `
    SELECT idTeam as t_id, name as t_name
    FROM fbdb.team
    WHERE league = ?; 
    `;
    
    db.query(sqlTeam, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get teams."
            });
        }

        var table = {};

        for (let i = 0; i < result.length; i++) {
            table[result[i].t_id] = [];
            table[result[i].t_id].push(result[i].t_name); 
            for (let j = 0; j < 8; j++){
                table[result[i].t_id].push(0); 
            }
            table[result[i].t_id].push(result[i].t_id);   
        }

        var sqlMatch = `
        SELECT homeScore as home_s, homeTeam as home_t, awayScore as away_s, awayTeam as away_t
        from fbdb.match
        where season = 2018 and league = ?;
        `;

        db.query(sqlMatch, [req.params.id], function(error, result){
            if (error) {
                res.status(404).json({
                    error: "Failed to get teams."
                });
            }

            for (let i = 0; i < result.length; i++) {

                table[result[i].home_t][1] += 1;
                table[result[i].away_t][1] += 1;

                table[result[i].home_t][5] += result[i].home_s;
                table[result[i].home_t][6] += result[i].away_s;

                table[result[i].away_t][5] += result[i].away_s;
                table[result[i].away_t][6] += result[i].home_s;

                table[result[i].away_t][7] = table[result[i].away_t][5] - table[result[i].away_t][6];
                table[result[i].home_t][7] = table[result[i].home_t][5] - table[result[i].home_t][6];
                
                if(result[i].home_s > result[i].away_s)
                {
                    table[result[i].home_t][8] += 3;
                    table[result[i].home_t][2] += 1;
                    table[result[i].away_t][4] += 1;
                }
                else if(result[i].home_s < result[i].away_s)
                {
                    table[result[i].away_t][8] += 3;
                    table[result[i].away_t][2] += 1;
                    table[result[i].home_t][4] += 1;
                }
                else
                {
                    table[result[i].home_t][8] += 1;
                    table[result[i].away_t][8] += 1;
                    table[result[i].home_t][3] += 1;
                    table[result[i].away_t][3] += 1;
                }
                
            }
            console.log(table);
            res.status(200).json(table);
        });

    });   
    
});

/* GET leagues list. */
router.get('/list', function(req, res, next){ // league logosu eklenebilir
    var sql = `
    SELECT L.idLeague as l_id, L.name as l_name, C.flag as c_flag 
    FROM fbdb.league as L, fbdb.country as C 
    WHERE L.country=C.idCountry;
    `;

    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get leagues."
            });
        }
        
        res.status(200).json(result);
    });
});

module.exports = router;