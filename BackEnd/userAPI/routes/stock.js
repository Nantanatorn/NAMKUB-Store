const express = require("express");
const StockContorl = require("../Controller/Stock");

const router = express.Router();

    router.get('/stock',StockContorl.getAllStock);
    router.get('/stockview',StockContorl.getAllStockView);
    router.get('/restockview',StockContorl.getRestockHistory)
    router.post('/restock',StockContorl.RestockProduct);
    



module.exports = router;