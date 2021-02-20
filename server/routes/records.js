const express = require('express');
const router = express.Router();

const Record = require('../models/Record');

//Настраиваем end point для Rest API 
router.get('/', async (req, res) => {
    res.json(await Record.find());
});

router.post('/', async (req, res) => {
    const record = new Record(req.body);
    await record.save();
    try {
        res.json({ state: 'success' });
    }
    catch {
        res.json({ state: 'error' });
    }
});

router.put('/:id', async (req, res) => {
    await Record.findByIdAndUpdate(req.params.id, req.body);
    res.json({ state: 'updated' });
});

router.delete('/:id', async (req, res) => {
    await Record.findByIdAndRemove(req.params.id);
    res.json({ state: 'deleted' });
});

module.exports = router;