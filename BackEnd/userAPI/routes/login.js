    const express = require("express");
    const router = express.Router();
    const loginCon=require('../Controller/login')
  
    router.post('/login',loginCon.loginUser)
 
    module.exports = router;
