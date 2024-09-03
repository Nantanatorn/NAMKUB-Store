var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const sql = require('mssql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors()); // Initialize CORS correctly

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Example route for database query
app.get('/data/:id', async (req, res) => {
    const value = req.params.id; // Get value from request parameters
    try {
        await sql.connect('Server=localhost,1433;Database=database;User Id=ing;Password=1234;Encrypt=false');
        const result = await sql.query`select * from mytable where id = ${value}`;
        res.json(result.recordset); // Send the result as a JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});



app.listen(6000, () => {
  console.log('CORS-enabled web server listening on port 6000');
});

module.exports = app;
