const sql = require("mssql");
const config = require("../config");
require('dotenv').config();

module.exports.getAllProducts = async (req, res) => {
    try {
        var pool = await sql.connect(config);

        const result = await pool.request().query("SELECT * from Product");

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
            const { Product_Name, Product_Picture, Product_Size, Product_Price, Sup_ID } = req.body;
            var pool = await sql.connect(config);
            var addProducts = await pool.request()


            .input('Name', sql.VarChar, Product_Name)
            .input('Picture', sql.VarChar, Product_Picture)
            .input('Size', sql.Int, Product_Size)
            .input('Price', sql.Money, Product_Price)
            .input('Sup_ID', sql.Int, Sup_ID)
            .query('INSERT INTO Product (Product_Name, Product_Picture, Product_Size, Product_Price, Sup_ID) VALUES ( @Name, @Picture, @Size, @Price, @Sup_ID)');

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