const sql = require("mssql");
const config = require("../config");
require('dotenv').config();

module.exports.getAllUser = async (req, res) => {

    try{
        const conn = await sql.connect(config);

        const result = await conn.request().query("SELECT * From Userview");


        res.status(200).json(result.recordset);

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }  
}

module.exports.CusAddress = async (req, res) => {

        const { Cus_Address } = req.body; 

    try{
        const conn = await sql.connect(config);
        const result = await  conn.request()

        .input('CusAddress',sql.VarChar,Cus_Address)
        .query(`insert into tbl_Customer ( CusAddress ) VALUES (@Cus_Address) `)
    
        res.status(200).json({
            message: 'add Address successfully',
            data: result.recordset
        })

    }catch(err){
        console.log('error message',error.message)
        res.status(500).json({
            message: 'พัง พัง พัง พัง พัง',
        })
    }
}

module.exports.UpdateUser = async (req, res) => {
    const { Product_Name, Product_Picture, Product_Size, Product_Price, Sup_ID, Product_status } = req.body;
try{     var pool = await sql.connect(config);
       var UpdateProducts = await pool.request()

       .input('id', sql.Int, req.params.id)
       .input('Name', sql.VarChar, Product_Name)
       .input('Picture', sql.VarChar, Product_Picture)
       .input('Size', sql.Int, Product_Size)
       .input('Price', sql.Money, Product_Price)
       .input('Sup_ID', sql.Int, Sup_ID)
       .input('Status',sql.VarChar,Product_status)
       .query('UPDATE Product SET Product_Name = @Name, Product_Picture = @Picture, Product_Size = @Size , Product_Price = @Price , Sup_ID = @Sup_ID ,Product_status = @Status WHERE Product_ID = @ID ')

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

module.exports.sreachuser = async (req , res) => {

    try{
        const pool = await sql.connect(config);
        const search = req.query.q;
        
        const result = await pool.request()
        
        .input('search',sql.VarChar,`%${search}%`)
        .query(` SELECT * FROM Users WHERE username LIKE @search
                
                `);

            res.status(200).json(result.recordset);


    }catch(err){

        console.error(err);
        res.status(500).send('No Content in Table or Server Error');
    }
}