const sql = require("mssql");
const config = require("../config");
require('dotenv').config();

module.exports.getAllStock = async (req ,res ) => {

        try {
                var pool = await sql.connect(config);

                const result = await pool.request().query("SELECT * from Tbl_Stock");

                res.status(200).json(result.recordset);

        }catch(err){

            console.error(err);
            res.status(500).send('Internal Server Error');

        }


}

module.exports.getAllStockView = async (req ,res ) => {

    try {
            var pool = await sql.connect(config);

            const result = await pool.request().query("SELECT * from StockView");

            res.status(200).json(result.recordset);

    }catch(err){

        console.error(err);
        res.status(500).send('No Content in Table or Server Error');

    }

}

module.exports.getRestockHistory = async (req, res) => {

    try {
        var pool = await sql.connect(config);

        const result = await pool.request().query("SELECT * from RestockView");

        const formattedData = result.recordset.map(item => ({
            ...item,
            Restock_Date: new Date(item.Restock_Date).toISOString().split('T')[0] // แสดงเฉพาะวันที่
        }));

        res.status(200).json(formattedData);

    }catch(err){

    console.error(err);
    res.status(500).send('No Content in Table or Server Error');

}

}

module.exports.RestockProduct = async (req, res) => {

    try{    
            const { Restock_Quantity, Restock_Unitprice, Stock_ID } = req.body;
            var pool = await sql.connect(config);
            
            var Restock = await pool.request()
            .input ('Restock_Quantity',sql.Int, Restock_Quantity)
            .input('Restock_Unitprice',sql.Money, Restock_Unitprice)
            .input('Stock_ID',sql.Int, Stock_ID)
            .execute('RestockProduct');



        res.status(200).json({
                message: 'Restock  successfully',
                data: Restock.recordset
            });
    }catch(err){

        console.error(err);
        res.status(500).send('Internal Server Error');

    }

}