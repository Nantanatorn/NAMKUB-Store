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