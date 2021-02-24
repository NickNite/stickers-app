const express = require('express');
const routerDiet = express.Router();

const Diet = require('../models/Diet');

//Настраиваем end point для Rest API 
routerDiet.get('/', async (req, res) => {
    res.status(200).json(await Diet.find())
});

routerDiet.post('/', async (req, res) => {
    const recordDiet = new Diet(req.body);
   await recordDiet.save(Diet);
    try {
        res.json({ state: 'success' });
    }
    catch {
        res.json({ state: 'error' });
    }
});


module.exports = routerDiet;