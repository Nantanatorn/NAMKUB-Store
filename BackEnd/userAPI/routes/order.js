const express =require('express')
const router = express.Router();
const order =require('../Controller/order')
router.post('/order',order.AddOrder)
router.get('/getorder',order.GetOrder)
module.exports =router;