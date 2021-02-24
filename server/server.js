const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


const app = express();

app.set('port', 5000);
//Подключаем базу данных перед запуском сервера
mongoose.connect('mongodb+srv://n1xon:QZrdpyznXohfSUbK@cluster0.nxlrm.mongodb.net/Brokul?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology:
        true
})
    .then(db => console.log('[OK] DB is connected'))
    .catch(err => console.error(err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

//Подключаем Rest API 
app.use('/api/diet', require('./routes/diet'));
app.use('/api/snackbar', require('./routes/snackBar'));
app.use('/api/dietdata', require('./routes/dietData'));
app.use('/api/snackbardata', require('./routes/snackBarData'));



//Обозначаем статическую папку для  запуска приложения
app.use('/', express.static(path.join(__dirname, '../dist')));

//Запускаем сервер
app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});