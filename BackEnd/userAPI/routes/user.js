const express = require("express");
const router = express.Router();
const usercontroll = require('../Controller/users');

    router.get('/user',usercontroll.getAllUser);
    router.post('/cusaddress',usercontroll.CusAddress);
    router.get('/sreachuser',usercontroll.sreachuser);
    // router.put('/updateuser',usercontroll.UpdateUser)




module.exports = router;