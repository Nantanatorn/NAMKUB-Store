const express = require("express");
const productControl = require("../Controller/products");

const router = express.Router();

    router.get('/products',productControl.getAllProducts);
    router.get('/products/:id',productControl.getProdById);
    router.get('/activeproduct',productControl.getActiveProducts);
    router.get('/products/check',productControl.CheckProductName);
    router.get('/search',productControl.FindProducts);
    router.post('/products',productControl.addProducts);
    router.put('/products/:id',productControl.UpdateProducts);
    router.delete('/products/:id',productControl.DeleteProducts); 
    
    
    


module.exports = router;