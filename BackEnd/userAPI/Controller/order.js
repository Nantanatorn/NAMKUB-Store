const sql = require("mssql");
const config = require("../config");

module.exports.AddOrder= async(req,res)=>{
    const orderData =req.body.orderData;
    const customerData =req.body.customerData;
    try{
        const pool = await sql.connect(config);
        const transaction  =new sql.Transaction(pool);
        await transaction.begin();
      try{
         const orderInsertResult = await transaction.request()
         .input('OrderDate', sql.Date, orderData.orderDate)
         .input('')
      }
    }catch{

    }
}