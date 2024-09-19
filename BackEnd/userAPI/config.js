require('dotenv').config();

const config = {
    user:'sa',
    password:'1234',
    server:"127.0.0.1", 
    database:"BusinessProgram",
    synchronize: true,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    port: 1433,
};

module.exports = config;
