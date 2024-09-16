const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const loginroute = require('./routes/login');
const registerroute =require('./routes/register');
const testroute= require('./routes/test')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

app.use('/api',loginroute);
app.use('/api',registerroute);
app.use('/api',testroute);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



