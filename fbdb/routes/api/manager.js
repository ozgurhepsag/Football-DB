var express = require('express');
var router = express.Router();
var db = require('../../lib/db')

/* GET all rows */
router.get('/managers', function(req, res, next){
    var sql = `
        SELECT idManager as m_id, firstName as m_fname, lastName as m_lname,
               birthDate as m_bdate, image as m_image
        FROM fbdb.manager;
    `;

    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get managers."
            });
        }
        
        res.status(200).json(result);
    });
});

/* GET single row */
router.get('/managers/:id', function(req, res, next){
    var sql = `
        SELECT idManager as m_id, firstName as m_fname, lastName as m_lname,
            birthDate as m_bdate, image as m_image
        FROM fbdb.manager
        WHERE idManager = ?; 
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get manager."
            });
        }
        
        res.status(200).json(result[0]);
    });
});

/* POST player */
router.post('/managers', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.manager(firstName, lastName, birthDate, image)
        VALUES(?, ?, ?, ?);
    `;

    db.query(sql, [req.body.firstName, req.body.lastName, req.body.birthDate, req.body.image], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add manager.',
            });
        } 

        res.status(201).json({
            success: 'Manager added successfully!'
        });   
    })
})

/* DELETE player */
router.delete('/managers/:id', function(req, res, next){
    var sql = `
        DELETE FROM fbdb.manager
        WHERE idManager = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to delete manager.',
            });
        }
        
        res.status(201).json({
            success: 'Manager deleted successfully!'
        });
    });
});

/* UPDATE player */
router.put('/managers/:id', function(req, res, next){
    var sql = `
        UPDATE fbdb.manager
        SET firstName = ?, lastName = ?, birthDate = ?, image = ?
        WHERE idManager = ?;
    `;

    db.query(sql, [req.body.firstName, req.body.lastName, req.body.birthDate, req.body.image, req.params.id], function(error, result){
        if(error){    
            console.log(error);
            res.status(404).json({
                error: 'Failed to update manager.'
            });
        } 
        res.status(201).json({
            success: 'Manager updated successfully!'
        });  
    });
})

module.exports = router;