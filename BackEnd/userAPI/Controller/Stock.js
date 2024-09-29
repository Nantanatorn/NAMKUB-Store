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
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;


            const result = await pool.request()
            .input('offset', sql.Int, offset)
            .input('limit', sql.Int, limit)
            .query("SELECT * from StockView ORDER BY Stock_ID OFFSET @offset ROWS FETCH NEXT @limit ROW ONLY");

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

module.exports.SreachStock = async (req , res) => {

    try{
        const pool = await sql.connect(config);
        const search = req.query.q;
        
        const result = await pool.request()
        .input('searchID',sql.Int,parseInt(search))
        .input('search',sql.VarChar,`%${search}%`)
        .query(` SELECT * FROM StockView WHERE Product_Name LIKE @search
                OR  Sup_Name LIKE @search 
                OR  Stock_ID LIKE @searchID`);

            res.status(200).json(result.recordset);


    }catch(err){

        console.error(err);
        res.status(500).send('No Content in Table or Server Error');
    }
}

module.exports.SreachRestock = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const search = req.query.q;
        const searchDate = req.query.date;

        const result = await pool.request()
            .input('searchID', sql.Int, isNaN(parseInt(search)) ? null : parseInt(search))
            .input('search', sql.VarChar, `%${search}%`)
            .input('searchDate', sql.VarChar, searchDate ? `%${searchDate}%` : null)
            .query(`
                SELECT 
                    Restock_ID,
                    Stock_ID,
                    Product_Name,
                    Restock_Quantity,
                    Restock_Unitprice,
                    Restock_TotalPrice,
                    CONVERT(VARCHAR(10), Restock_Date, 23) AS Restock_Date 
                FROM RestockView 
                WHERE 
                    (
                        Product_Name LIKE @search
                        OR Restock_ID = @searchID 
                        OR Stock_ID = @searchID
                    )
                AND (@searchDate IS NULL OR CONVERT(VARCHAR, Restock_Date, 23) LIKE @searchDate)
            `);
            console.log('Search query:', search);
            console.log('Search date:', searchDate);
        res.status(200).json(result.recordset);

    } catch (err) {
        console.error(err);
        res.status(500).send('No Content in Table or Server Error');
    }
};

