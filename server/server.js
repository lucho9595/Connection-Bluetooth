const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', userRoute);

app.listen(4000, () => {
    console.log('Servidor iniciado en el puerto 4000');
});
