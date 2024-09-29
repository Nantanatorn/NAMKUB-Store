const express = require("express");
const router = express.Router();
const usercontroll = require('../Controller/users');

    router.get('/user',usercontroll.getAllUser);




module.exports = router;