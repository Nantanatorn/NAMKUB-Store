const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const config = require('../config'); // Referring to your config.js
require('dotenv').config();
const {auth,checkRole}=require('../Middleware/auth')
const deliverControll=require('../Controller/deliver_register')
const router = express.Router();

router.post('/Deliver_register',deliverControll.deliver_enrollment)
module.exports = router;