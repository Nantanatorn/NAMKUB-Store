const express = require("express");
const config = require("../config");
const sql = require("mssql");
const router = express.Router();
const bcrypt = require('bcrypt');
const loginCon =require('../Controller/login')
require('dotenv').config();

//http://localhost:3000/api/login
router.post('/login',loginCon.loginUser)

module.exports = router;
