const sql = require("mssql");
const config = require("../config");
require('dotenv').config();

module.exports.GetAllSupplier = async (req, res) => {
    try {
        var pool = await sql.connect(config);

        const result = await pool.request()
        .query("SELECT * from Supplier");

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }   
};

module.exports.AddSupplier = async (req, res) => {
    try {
        const { Sup_Name} = req.body;
            
            var pool = await sql.connect(config);
            var AddSupplier = await pool.request()
            

            .input('Sup_Name', sql.VarChar, Sup_Name)          
            .query('insert into Supplier (Sup_Name) values (@Sup_Name)')
            
            res.status(200).json({
                message: 'Supplier added successfully',
                data: AddSupplier.recordset
            })

    }catch (error) {
            console.log('error message',error.message)
            res.status(500).json({
                message: 'พัง พัง พัง พัง พัง',
            })
    }
};
