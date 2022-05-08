// based the following code on lesson code
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeesDb'
});

module.exports = db;