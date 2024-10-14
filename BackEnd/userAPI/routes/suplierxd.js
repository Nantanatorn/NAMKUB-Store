const express = require("express");
const SupplierControl = require("../Controller/Suplier");

const router = express.Router();

    router.get('/getSupplier',SupplierControl.GetAllSupplier);
    router.post('/addsupplier',SupplierControl.AddSupplier);

    
    
    


module.exports = router;