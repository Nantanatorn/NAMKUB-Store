const express =require('express')
const router = express.Router();
const order =require('../Controller/order')
router.post('/order',order.AddOrder)
module.exports =router;