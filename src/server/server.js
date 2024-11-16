const express = require('express');
const mysql = require('mysql');
const multer = require('multer'); // used for the company logo upload, not implemented yet
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../")));
app.use(express.static(path.join(__dirname, '../public')));//Added the styles files in public so we can display Tailwind


const PORT = 3000;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soen287'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to database' + err);
    } else {
        console.log('Connected to database');
    }
});


// Customer's routes
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, "../customerLandingPage.html"));
});
app.get('/customerLogin', (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerLogin.html"));
});
app.get('/purchaseServices', (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerPurchaseServices.html"));
});
app.get('/myAccount', (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerHome.html"));
});
app.get('/myCart', (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerCart.html"));
});
app.get('/customerEditInfo', (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerEditInfo.html"));
});
app.get('/pastOrders', (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerPastOrders.html"));
});
app.get('/purchaseConfirmed', (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerPurchaseConfirmed.html"));
});






// Company's routes
app.get('/admin', (req, res) => { 
    res.sendFile(path.join(__dirname, "../landingPage.html"));
});
app.get('/companyLogin', (req, res) => { 
    res.sendFile(path.join(__dirname, "../company/companyLogin.html"));
});
app.get('/companyAccount', (req, res) => { 
    res.sendFile(path.join(__dirname, "../company/companyHome.html"));
});
app.get('/editAdminInfo', (req, res) => { 
    res.sendFile(path.join(__dirname, "../company/companyEditInfo.html"));
});
app.get('/editServices', (req, res) => { 
    res.sendFile(path.join(__dirname, "../company/companyEditServices.html"));
});
app.get('/unpaidBills', (req, res) => { 
    res.sendFile(path.join(__dirname, "../company/companyUnpaidBills.html"));
});
app.get('/allServicesSold', (req, res) => { 
    res.sendFile(path.join(__dirname, "../company/companyViewAllSales.html"));
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