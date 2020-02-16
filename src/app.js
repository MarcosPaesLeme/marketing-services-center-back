global.SALT_KEY = 'hjkaskhshuduqwyoueqy-17829873qwjkaksyd-iqiwuey8137d826';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require ('../src/routes/userRoute');
const ticketRoute = require ('./routes/ticketRoute');
const conversationRoute = require('./routes/watsonRoute');

app.use(cors({
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));


app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false }));

app.use('/user', userRoute);
app.use('/ticketRoute', ticketRoute);
app.use('/conversation', conversationRoute);

module.exports = app;