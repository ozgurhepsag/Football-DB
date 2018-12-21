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

module.exports = router;