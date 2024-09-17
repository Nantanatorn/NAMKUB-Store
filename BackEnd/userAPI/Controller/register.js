const config = require("../config");
const express = require("express");
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




module.exports.enrollment=async (req, res) => {
    const { firstname, lastname, username,email, password, confirmPassword, phone } = req.body;
    const defaultRole ='customer';
    // Simple validation
    if (!firstname || !lastname || !username||!email || !password || !confirmPassword || !phone) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
        const pool = await sql.connect(config);

        // Check if email already exists
        const checkUser = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (checkUser.recordset.length > 0) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

        // Insert new user
        await pool.request()
            .input('firstname', sql.VarChar, firstname)
            .input('lastname', sql.VarChar, lastname)
            .input('username', sql.VarChar,username)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword) // Store hashed password
            .input('phone', sql.VarChar, phone)
            .input('role',sql.VarChar,defaultRole)
            .query('INSERT INTO Users (firstname, lastname, username, email, password, phone,role) VALUES (@firstname, @lastname, @username, @email, @password, @phone,@role)');

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

