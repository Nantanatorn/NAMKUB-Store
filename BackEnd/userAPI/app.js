const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./config');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const loginroute = require('./routes/login');
const registerroute =require('./routes/register');
const productsRoute = require('./routes/product');
const deliver_register=require('./routes/deliver_register')
const testroute= require('./routes/test')
const stockroute = require('./routes/stock');
const orderroute =require('./routes/order');
const userroute = require('./routes/user');
const suplierroute = require('./routes/suplierxd');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;
app.use('/',orderroute)
app.use('/', loginroute);
app.use('/',registerroute);
app.use('/', productsRoute);
app.use('/',testroute);
app.use('/',deliver_register);
app.use('/',stockroute);
app.use('/',userroute);
app.use('/',suplierroute)
async function connectToDatabase() {
    try{
        await sql.connect(config);
        const result = await sql.query`SELECT DB_NAME() AS CurrentDatabase`; // ดึงชื่อฐานข้อมูลปัจจุบัน
        console.log('Connected to mssql');
        console.log('Using database:', result.recordset[0].CurrentDatabase); // แสดงชื่อฐานข้อมูล
        
    }catch(err){
        console.error('Database connection failed',err);
    }
}
connectToDatabase();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

