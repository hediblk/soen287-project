const express = require('express');
const mysql = require('mysql');
const multer = require('multer'); // used for the company logo upload, not implemented yet
const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soen287'
});

db.connect((err) => {
    if (err) {
        console;log('Error connecting to database' + err);
    } else {
        console.log('Connected to database');
    }
});



app.get('/', (req, res) => { // test if server is running
    res.send('Hello World');
});

app.get('/customers', (req, res) => { // get all customers to test if database works
    const sql = 'SELECT * FROM Customers';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/getcustomer/:id', (req, res) => { // get a specific customer by id
    const sql = `SELECT * FROM Customers WHERE customer_id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send('No customer found');
            }
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});