var express = require('express');
var router = express.Router();
var db = require('../../lib/db')

/* GET all rows */
router.get('/manager_contracts', function(req, res, next){
    var sql = `
        SELECT C.idContract as c_id, C.startDate as c_start, C.endDate as c_end, C.value as c_value,
               M.firstName as m_fname, M.lastName as m_lname, M.idManager as m_id,
               T.name as t_name, T.idTeam as t_id
        FROM fbdb.manager_contract as C, fbdb.manager as M, fbdb.team as T
        WHERE C.manager = M.idManager AND C.team = T.idTeam;
    `;

    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get contracts."
            });
        }
        res.status(200).json(result);
    });
});

/* GET single row */
router.get('/manager_contracts/:id', function(req, res, next){
    var sql = `
        SELECT C.idContract as c_id, C.startDate as c_start, C.endDate as c_end, C.value as c_value,
            M.firstName as m_fname, M.lastName as m_lname, M.idManager as m_id,
            T.name as t_name, T.idTeam as t_id
        FROM fbdb.manager_contract as C, fbdb.manager as M, fbdb.team as T
        WHERE C.manager = M.idManager AND C.team = T.idTeam AND C.idContract = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get contract."
            });
        }
        
        res.status(200).json(result[0]);
    });
});

/* POST player */
router.post('/manager_contracts', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.manager_contract(value, startDate, endDate, team, manager)
        VALUES(?, ?, ?, ?, ?);
    `;

    db.query(sql, [req.body.value, req.body.startDate, req.body.endDate, req.body.team, req.body.manager], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add contract.',
            });
        } 

        res.status(201).json({
            success: 'Contract added successfully!'
        });   
    })
})

/* DELETE player */
router.delete('/manager_contracts/:id', function(req, res, next){
    var sql = `
        DELETE FROM fbdb.manager_contract
        WHERE idContract = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to delete contract.',
            });
        }
        
        res.status(201).json({
            success: 'Contract deleted successfully!'
        });
    });
});

/* UPDATE player */
router.put('/manager_contracts/:id', function(req, res, next){
    var sql = `
        UPDATE fbdb.manager_contract
        SET startDate = ?, endDate = ?, value = ?, manager = ?, team = ?
        WHERE idContract = ?;
    `;

    db.query(sql, [req.body.startDate, req.body.endDate, req.body.value, req.body.manager, req.body.team, req.params.id], function(error, result){
        if(error){    
            console.log(error);
            res.status(404).json({
                error: 'Failed to update contract.'
            });
        } 
        res.status(201).json({
            success: 'Contract updated successfully!'
        });  
    });
})

module.exports = router;