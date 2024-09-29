const express = require("express");
const StockContorl = require("../Controller/Stock");

const router = express.Router();

    router.get('/stock',StockContorl.getAllStock);
    router.get('/stockview',StockContorl.getAllStockView);
    router.get('/restockview',StockContorl.getRestockHistory)
    router.post('/restock',StockContorl.RestockProduct);
    router.get('/sreachstock',StockContorl.SreachStock);
    router.get('/sreachrestock',StockContorl.SreachRestock);


module.exports = router;