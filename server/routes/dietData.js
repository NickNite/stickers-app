const express = require('express');
const routerDietData = express.Router();

const DietData = require('../models/DietData');

//Настраиваем end point для Rest API 
routerDietData.get('/', async (req, res) => {
    res.json(await DietData.find());
});

routerDietData.post('/', async (req, res) => {
    const record = new DietData(req.body);
    await record.save();
    try {
        res.json({ state: 'success' });
    }
    catch {
        res.json({ state: 'error' });
    }
});

// routerDietData.put('/:id', async (req, res) => {
//     await Record.findByIdAndUpdate(req.params.id, req.body);
//     res.json({ state: 'updated' });
// });



module.exports = routerDietData;