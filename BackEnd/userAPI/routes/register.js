const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const config = require('../config'); // Referring to your config.js
require('dotenv').config();

const registerCon=require('../Controller/register')
const router = express.Router();

router.post('/register',registerCon.enrollment)
module.exports = router;