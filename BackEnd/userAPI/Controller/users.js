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