const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

// Get all entries

router.get('/', async (req, res, next) => {
    try{
        const entries = await LogEntry.find();
        res.json(entries);
    } catch(err){
        next(err);
    }
    
});

// Add a new entry

router.post('/', async (req, res, next) => {
    try{
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch(err){
        if(err.name === 'ValidationError'){
            res.status(422);
        }
        next(err);
    }
});

// Delete an entry
router.delete('/:id', async (req, res, next) => {
    try{
         
    } catch(err){
        next(err);
    }

})

// Update an entry

module.exports = router;