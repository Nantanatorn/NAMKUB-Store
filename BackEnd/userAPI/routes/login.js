const express = require("express");
const config = require("../config");
const sql = require("mssql");
const router = express.Router();

//http://localhost:3000/api/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;///////
    const pool = await sql.connect(config);
    
    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Query to check if user exists with the given username and password
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM login WHERE username = @username AND password = @password');

        if (result.recordset.length > 0) {
            // Successful login
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Unauthorized
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
