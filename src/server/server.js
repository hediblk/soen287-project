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



// Create a Customer Account
app.post("/customerCreateAccount", (req,res)=>{
    
    let customer={
        first_name:req.body.firstName,
        last_name:req.body.lastName,
        email:req.body.email,
        address:req.body.address,
        username:req.body.username,
        password:req.body.password
    }
    let sql = "INSERT INTO Customers SET ?";
    db.query(sql,customer, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, "../customer/customerLogin.html"));
            // res.send(result);
        }
    });

});

// Customer Login checking
var loggedUser_ID;
app.post("/customerLoginForm", (req, res) => {
    const { username, password } = req.body;

    let sql = "SELECT * FROM Customers WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.log(err);
        } else if (result.length > 0) {
             loggedUser_ID = result[0];
            res.sendFile(path.join(__dirname, "../customer/customerPurchaseServices.html"));
        } else {
            res.status(401).send("Invalid username or password!");
        }
    });
});

// Update customer info
app.post("/updateCustomerInfo", (req,res)=>{
    let updatedCustomer={
        first_name:(req.body.firstName.length === 0)? loggedUser_ID.first_name:req.body.firstName,
        last_name:(req.body.lastName.length === 0)? loggedUser_ID.last_name:req.body.lastName,
        email:(req.body.email.length === 0)? loggedUser_ID.email:req.body.email,
        address:(req.body.address.length === 0)? loggedUser_ID.address:req.body.address,
        username:(req.body.username.length === 0)? loggedUser_ID.username:req.body.username,
        password:(req.body.password.length === 0)? loggedUser_ID.password:req.body.password,
        customer_id: loggedUser_ID.customer_id
    }
    let sql = `UPDATE Customers SET ? WHERE customer_id = ${loggedUser_ID.customer_id}`;
    db.query(sql, updatedCustomer, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, "../customer/customerHome.html"));
        } 
    });

})



// Delete a customer Account
app.get("/deleteCustomerAccount", (req,res)=>{
   
    let sql = `DELETE FROM Customers WHERE customer_id = ${loggedUser_ID}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, "../customerLandingPage.html"));
        } 
    });

})






// Create an Admin Account
app.post("/adminCreateAccount", (req,res)=>{
    
    let admin={
        first_name:req.body.firstName,
        last_name:req.body.lastName,
        email:req.body.email,
        address:req.body.address,
        username:req.body.username,
        password:req.body.password
    }
    let sql = "INSERT INTO Admins SET ?";
    db.query(sql,admin, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, "../company/companyLogin.html"));
           
        }
    });

});

// Admin Login checking
var loggedAdmin_ID;
app.post("/adminLoginForm", (req, res) => {
    const { username, password } = req.body;

    let sql = "SELECT * FROM Admins WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.log(err);
        } else if (result.length > 0) {
            loggedAdmin_ID = result[0];
            res.sendFile(path.join(__dirname, "../company/companyHome.html"));
        } else {
            res.status(401).send("Invalid username or password!");
        }
    });
});

// Update admin info
app.post("/updateAdminInfo", (req,res)=>{
    let updatedAdmin={
        first_name:(req.body.firstName.length === 0)? loggedAdmin_ID.first_name:req.body.firstName,
        last_name:(req.body.lastName.length === 0)? loggedAdmin_ID.last_name:req.body.lastName,
        email:(req.body.email.length === 0)? loggedAdmin_ID.email:req.body.email,
        address:(req.body.address.length === 0)? loggedAdmin_ID.address:req.body.address,
        username:(req.body.username.length === 0)? loggedAdmin_ID.username:req.body.username,
        password:(req.body.password.length === 0)? loggedAdmin_ID.password:req.body.password,
        admin_id: loggedAdmin_ID.admin_id
    }
    let sql = `UPDATE Admins SET ? WHERE admin_id = ${loggedAdmin_ID.admin_id}`;
    db.query(sql, updatedAdmin, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, "../company/companyHome.html"));
        } 
    });

})




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