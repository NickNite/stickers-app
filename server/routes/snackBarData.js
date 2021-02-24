const express = require('express');
const routerSnackBarData = express.Router();

const SnackBarData = require('../models/SnackBarData');

//Настраиваем end point для Rest API 
routerSnackBarData.get('/', async (req, res) => {
        res.json(await SnackBarData.find());
    });

routerSnackBarData.post('/', async (req, res) => {
    const record = new SnackBarData(req.body);
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



module.exports = routerSnackBarData;