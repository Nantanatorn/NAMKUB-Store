require('dotenv').config();


const config = {
    user: process.env.DBuser,
    password: process.env.DBpassword,
    server: process.env.DBserver, 
    database: process.env.databaseName,
    synchronize: true,
    options: {
        encrypt: true, 
        trustServerCertificate: true,
        enableArithAbort: true
    },
    port: 1433, 
};


module.exports = config;