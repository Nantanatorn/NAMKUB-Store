const sql = require("mssql");
const config = require("../config");
require('dotenv').config();

module.exports.getAllProducts = async (req, res) => {
    try {
        var pool = await sql.connect(config);

        const result = await pool.request().query("SELECT * from ProductwithStock");

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }   
};

module.exports.getProdById = async (req, res) => {
    try {
        var pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.Int, req.params.id) // Bind the ID parameter
            .query("SELECT * from Product WHERE Product_ID = @ID");
        
        if (result.recordset.length === 0) {
            return res.status(404).send('หาดีๆ ดิ ไอเหี้ย');
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.addProducts = async (req, res) => {
    try {
        const { Product_Name, Product_Picture, Product_Size, Product_Price, Sup_ID, StockQuantity, SupUnitPrice } = req.body;
            // const { Product_Name, Product_Picture, Product_Size, Product_Price, Sup_ID } = req.body;
            var pool = await sql.connect(config);
            var addProducts = await pool.request()

            .input('ProductName', sql.VarChar, Product_Name)          
            .input('ProductPicture', sql.VarChar, Product_Picture)   
            .input('ProductSize', sql.Int, Product_Size)              
            .input('ProductPrice', sql.Money, Product_Price)         
            .input('Sup_ID', sql.Int, Sup_ID)                        
            .input('StockQuantity', sql.Int, StockQuantity)          
            .input('SupUnitPrice', sql.Money, SupUnitPrice) 
            // .input('Name', sql.VarChar, Product_Name)
            // .input('Picture', sql.VarChar, Product_Picture)
            // .input('Size', sql.Int, Product_Size)
            // .input('Price', sql.Money, Product_Price)
            // .input('Sup_ID', sql.Int, Sup_ID)

            .execute('AddProductandStock');
            
            res.status(200).json({
                message: 'Product added successfully',
                data: addProducts.recordset
            })

    }catch (error) {
            console.log('error message',error.message)
            res.status(500).json({
                message: 'พัง พัง พัง พัง พัง',
            })
    }
};

module.exports.UpdateProducts = async (req, res) => {
         const { Product_Name, Product_Picture, Product_Size, Product_Price, Sup_ID } = req.body;
   try{     var pool = await sql.connect(config);
            var UpdateProducts = await pool.request()

            .input('id', sql.Int, req.params.id)
            .input('Name', sql.VarChar, Product_Name)
            .input('Picture', sql.VarChar, Product_Picture)
            .input('Size', sql.Int, Product_Size)
            .input('Price', sql.Money, Product_Price)
            .input('Sup_ID', sql.Int, Sup_ID)
            .query('UPDATE Product SET Product_Name = @Name, Product_Picture = @Picture, Product_Size = @Size , Product_Price = @Price , Sup_ID = @Sup_ID WHERE Product_ID = @ID')

            res.status(200).json({
                message: 'Product Update successfully',
                data: UpdateProducts.recordset
            })
        }catch (error) {
            console.log('error message',error.message)
            res.status(500).json({
                message: 'พัง พัง พัง พัง พัง',
            })
    }
};

module.exports.DeleteProducts = async (req, res) => {

    try{    var pool = await sql.connect(config);
            var DeleteProducts = await pool.request()

            .input('id', sql.Int, req.params.id)
            
            .query('DELETE from Product  WHERE Product_ID = @ID')

            res.status(299).json({
                message: 'Product Delete successfully',
                data: DeleteProducts.recordset
            })



    }catch (error) {
        console.log('error message',error.message)
        res.status(500).json({
            message: 'พัง พัง พัง พัง พัง',
        })
    }
};

module.exports.CheckProductName = async (req, res) => {

    try{ 
        const Product_Name = req.query.Product_Name;
        const pool = await sql.connect(config);
        const checked = await pool.request()

        .input('Product_Name', sql.VarChar, Product_Name)
        .query('SELECT * FROM Product WHERE Product_Name = @Product_Name');

        if (checked.recordset.length > 0) {
            // If product exists, return exists as true
            res.json({ exists: true });
        } else {
            // If product does not exist
            res.json({ exists: false });    
        }
    }catch(err){
        console.log('error message',error.message)
        res.status(500).json({
            message: 'พัง พัง พัง พัง พัง',
        })
    }
}
module.exports.FindProducts = async (req, res) => {
        try{
        const pool = await sql.connect(config);
        const search = req.query.q;

        const result = await pool.request()
            .input('search',sql.VarChar,`%${search}%`)
            .query(' SELECT * FROM ProductwithStock WHERE Product_Name LIKE @search');

            res.status(200).json(result.recordset);

    }catch(err){

        console.err(err);
        res.status(500).send('error');

    }
}
