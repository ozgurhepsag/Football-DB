var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/:id/', function(req, res, next){
    var sql = `
    SELECT firstName as m_fname, lastName as m_lname 
    FROM fbdb.manager
    WHERE idManager = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get managers."
            });
        }
        
        res.render('manager', {
            title: "Manager - " + result[0].m_fname + " " + result[0].m_lname,
        });
    });
});

router.get('/:id/profile', function(req, res, next){
    var sql = `
    SELECT name as m_teamname, idTeam as m_teamid, firstName as m_fname, lastName as m_lname, birthDate as m_bt, image as m_image 
    FROM fbdb.manager, fbdb.team
    WHERE idManager = ? and manager = idManager;
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

router.get('/:id/contracts', function(req, res, next){
    var sql = `
    SELECT t.name as c_teamname, mc.startDate as c_start, mc.endDate as c_end, mc.value as c_value, t.idTeam as c_teamid
    from fbdb.manager_contract as mc, fbdb.team as t
    where mc.manager = ? and t.manager = mc.manager
    order by c_end DESC;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get contract."
            });
        }
        
        res.status(200).json(result);
    });
});

module.exports = router;