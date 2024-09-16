const express = require("express");
const config = require("../config");
const sql = require("mssql");
const router = express.Router();
const {auth,checkRole}=require('../Middleware/auth')
router.get('/test',auth,checkRole('admin'),(req,res)=>{
    console.log('Role in request:', req.user.role); // Debugging line
    res.send('hello testttt')

})
module.exports = router;