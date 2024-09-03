const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();
const port = 3000; 

app.use(cors());
app.use(express.json()); // To parse JSON bodies

const sqlConfig = {
  user: 'ing',
  password: '1234',
  database: 'NamKUBstore',
  server: 'localhost',
  options: {
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  port: 1433
};

// Initialize SQL connection pool
let pool;

(async () => {
  try {
    pool = await sql.connect(sqlConfig);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

// Route to get data from the UserReg table
app.get('/', async (req, res) => {
  if (!pool) {
    return res.status(500).json({ error: 'Database connection not initialized' });
  }
  try {
    const result = await pool.request().query('SELECT * FROM UserReg');
    res.json(result.recordset); // Send the results as JSON
  } catch (err) {
    console.error('Query failed:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Route to insert a new user
app.post('/users', async (req, res) => {
  if (!pool) {
    return res.status(500).json({ error: 'Database connection not initialized' });
  }
  const { id, firstname, lastname, email, password } = req.body;

  // Log the incoming request data
  console.log('Received data:', { id, firstname, lastname, email, password });

  try {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('firstname', sql.VarChar, firstname)
      .input('lastname', sql.VarChar, lastname)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .query('INSERT INTO users (id, firstname, lastname, email, password) VALUES (@id, @firstname, @lastname, @email, @password)');

    console.log('Insert result:', result);
    res.json(result); // Send the result of the insert operation as JSON
  } catch (err) {
    console.error('Insert failed:', err);
    res.status(500).json({ error: 'Failed to insert data', details: err });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
