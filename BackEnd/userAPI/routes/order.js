const express =require('express')
const router = express.Router();
const order =require('../Controller/order')

    router.post('/order',order.AddOrder)
    router.get('/getorder',order.GetOrder)
    router.get('/summary',order.GetSummary)
    router.get('/AlltimeSUM',order.GetAllsum)

module.exports =router;