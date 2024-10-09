
const sql = require("mssql");
const config = require("../config");

module.exports.AddOrder = async (req, res) => {
  const orderData = req.body;
  console.log('Received Order Data:', orderData);  // ตรวจสอบว่าได้รับข้อมูล orderData หรือไม่


  const orderDate = new Date();
  const deliveryDate = new Date();
  const username = orderData.username;
  console.log('Username:', username);  // ตรวจสอบว่าได้รับ username หรือไม่

  try {
    const pool = await sql.connect(config);
    const transaction = new sql.Transaction(pool);
    await transaction.begin();
    try {
      console.log('Connected to database and started transaction');

      const userResult = await transaction.request()
        .input('Username', sql.VarChar, username)
        .query("SELECT Users.User_ID, tbl_Customer.Cus_ID FROM Users JOIN tbl_Customer ON Users.User_ID = tbl_Customer.User_ID WHERE Users.username=@Username");
      console.log('User Result:', userResult.recordset);  // ตรวจสอบว่ามีข้อมูล user ถูกดึงมาได้หรือไม่

      if (userResult.recordset.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userId = userResult.recordset[0].User_ID;
      const cusId = userResult.recordset[0].Cus_ID;
      console.log('User ID:', userId, 'Customer ID:', cusId);  // ตรวจสอบว่าได้ค่า userId และ cusId ถูกต้องหรือไม่

      // Insert order
      const orderInsertResult = await transaction.request()
        .input('OrderDate', sql.DateTime, orderDate)
        .input('CustomerID', sql.Int, cusId)
        .input('TotalPrice', sql.Money, orderData.totalPrice)
        .query("INSERT INTO tbl_Order (Order_Date, Cus_ID, Total_Price) OUTPUT INSERTED.Order_ID VALUES (@OrderDate, @CustomerID, @TotalPrice)");
      console.log('Order Insert Result:', orderInsertResult.recordset);  // ตรวจสอบผลลัพธ์ของการ insert order

      const orderId = orderInsertResult.recordset[0].Order_ID;
      console.log('Order ID:', orderId);  // ตรวจสอบว่าได้ค่า orderId ถูกต้องหรือไม่

      // Insert OrderDetail
      for (let item of orderData.item) {
        console.log('Inserting Order Detail for item:', item);  // ตรวจสอบข้อมูลของแต่ละ item ก่อน insert

        await transaction.request()
          .input('OrderID', sql.Int, orderId)
          .input('ProductID', sql.Int, item.Product_ID)

          .input('OrderQuantity', sql.Int, item.Order_Quantity)
          .input('Subtotal_Price', sql.Money, item.Subtotal_Price)
          .query("INSERT INTO tbl_OrderDetails (Order_ID, Product_ID, Order_Quantity, Subtotal_Price) VALUES (@OrderID, @ProductID, @OrderQuantity, @Subtotal_Price)");
        console.log('Order Detail inserted for item:', item.Product_ID);  // ตรวจสอบว่าการ insert สำเร็จหรือไม่
      }

      // Insert delivery_bill
      console.log('Inserting Delivery Bill');
      await transaction.request()
        .input('OrderID', sql.Int, orderId)
        .input('DeliveryDate', sql.DateTime, deliveryDate)
        .query('INSERT INTO Delivery_Bill (Order_ID, Deli_Date) VALUES (@OrderID, @DeliveryDate)');
      console.log('Delivery Bill inserted');  // ตรวจสอบว่าการ insert delivery_bill สำเร็จหรือไม่

      // Commit
      await transaction.commit();
      console.log('Transaction committed successfully');  // ตรวจสอบว่า transaction ถูก commit สำเร็จ
      res.status(200).json({ message: 'Order placed successfully', orderId });
    }
    catch (error) {
      await transaction.rollback();
      console.error('Error during order placement:', error);  // ตรวจสอบข้อผิดพลาดระหว่างการดำเนินการ
      res.status(500).json({ message: 'Error placing order', error: error.message });
    }
  }
  catch (error) {
    console.error('Error connecting to database:', error);  // ตรวจสอบข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล
    res.status(500).json({ message: 'Server connection error', error: error.message });
  }
};

module.exports.GetOrder = async (req, res) => {
  try {
      var pool = await sql.connect(config);

      const result = await pool.request().query(`SELECT CONVERT(Date,dbo.tbl_Order.Order_Date), dbo.tbl_OrderDetails.Order_ID, dbo.Product.Product_Name, dbo.tbl_OrderDetails.Order_Quantity, dbo.tbl_Order.Total_Price
FROM dbo.tbl_Order
INNER JOIN dbo.tbl_OrderDetails ON dbo.tbl_Order.Order_ID = dbo.tbl_OrderDetails.Order_ID
INNER JOIN dbo.Product ON dbo.tbl_OrderDetails.Product_ID = dbo.Product.Product_ID`);

      

      res.status(200).json(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }   
};
