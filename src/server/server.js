const express = require('express');
const mysql = require('mysql');
const multer = require('multer'); // used for the company logo upload, not implemented yet
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../")));
app.use(express.static(path.join(__dirname, '../public')));//Added the styles files in public so we can display Tailwind
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../assets"));
    },
    filename: function (req, file, cb) {
        cb(null, "Logo.jpg" );
    },
    });

const upload = multer({ storage: storage });


function isUserLoggedIn(req, res, next) {
    if (req.session.user) {
      next(); // User is logged in, proceed to the next middleware/route
    } else {
        req.session.returnTo = req.originalUrl;
      res.redirect('/customerLogin'); // Redirect to the login page if not logged in
    }
  }

  function isAdminLoggedIn(req, res, next) {
    if (req.session.admin) {
      next(); // Admin is logged in, proceed to the next middleware/route
    } else {
        req.session.returnTo = req.originalUrl;
      res.redirect('/companyLogin'); // Redirect to the login page if not logged in
    }
  }





// Customer's routes
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, "../customerLandingPage.html"));
});
app.get('/customerLogin', (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerLogin.html"));
});
app.get('/purchaseServices', isUserLoggedIn, (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerPurchaseServices.html"));
});
app.get('/myAccount',isUserLoggedIn, (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerHome.html"));
});
app.get('/myCart',isUserLoggedIn, (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerCart.html"));
});
app.get('/customerEditInfo',isUserLoggedIn, (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerEditInfo.html"));
});
app.get('/pastOrders',isUserLoggedIn, (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerPastOrders.html"));
});
app.get('/purchaseConfirmed',isUserLoggedIn, (req, res) => { // test if server is running
    res.sendFile(path.join(__dirname, "../customer/customerPurchaseConfirmed.html"));
});




// Company's routes
app.get('/admin', (req, res) => { 
    res.sendFile(path.join(__dirname, "../landingPage.html"));
});
app.get('/companyLogin', (req, res) => { 
    res.sendFile(path.join(__dirname, "../company/companyLogin.html"));
});
app.get('/companyAccount', isAdminLoggedIn,(req, res) => { 
    res.sendFile(path.join(__dirname, "../company/companyHome.html"));
});
app.get('/editAdminInfo',isAdminLoggedIn, (req, res) => { 
    res.sendFile(path.join(__dirname, "../company/companyEditInfo.html"));
});
app.get('/editServices',isAdminLoggedIn, (req, res) => { 
    res.sendFile(path.join(__dirname, "../company/companyEditServices.html"));
});
app.get('/unpaidBills',isAdminLoggedIn, (req, res) => { 
    res.sendFile(path.join(__dirname, "../company/companyUnpaidBills.html"));
});
app.get('/allServicesSold',isAdminLoggedIn, (req, res) => { 
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
             req.session.user = {username};
             const redirectTo = req.session.returnTo || 'purchaseServices';
             delete req.session.returnTo;
             res.redirect(redirectTo);
        } else {
            res.send(`
                <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./styles/normlize.css" />
    <link href="./styles/output.css" rel="stylesheet" />
    <title>Service Pro</title>
  </head>

  <body class="flex flex-col min-h-screen bg-gray-100">
    <!-- Header Section -->
    <header class="header bg-white py-2 md:py-4">
      <div class="container mx-auto flex items-center space-x-4">
        <img
          class="logo h-8 w-8 md:h-12 md:w-12"
          src="./assets/logo.jpg"
          alt="Service Pro Logo"
        />
        <a href="./customerLandingPage.html">
          <h1 class="company-name-place text-lg md:text-2xl font-bold" style="color: #10cab7">
            Company_Name
          </h1>
        </a>
      </div>
    </header>

    <!-- Main Content Section -->
    <div
      class="container mx-auto flex-grow p-4 md:p-8 flex items-center justify-center"
      id="content"
    >
      <div
        class="flex flex-col space-y-1.5 justify-center items-center bg-white rounded-lg shadow-md p-4"
      >
        <h2 class="text-2xl text-center">
          User Name or passwrod are incorrect!!!
        </h2>
        <div class="flex lg:flex-row flex-col lg:gap-6">
          <button
            class="block text-center bg-[#2c4755] text-white px-6 py-3 rounded-md hover:text-emerald-300 transition-colors duration-200 mt-4"
          >
            <a href="customerLogin" class="text-lg">Try again!</a>
            
          </button>
          
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="py-2 md:py-4 text-center bg-[#2c4755]">
      <p class="text-white">
        © 2024
        <span style="color: #10cab7">Service Pro</span>
        - All Rights Reserved
      </p>
    </footer>
    <script src="./js/services.js"></script>
  </body>
</html>
                `);
        }
    });
});
// Customer Logout
app.get('/api/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.send('Error logging out');
      }
      res.redirect('/');
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
    loggedUser_ID=updatedCustomer;
    let sql = `UPDATE Customers SET ? WHERE customer_id = ${loggedUser_ID.customer_id}`;
    db.query(sql, updatedCustomer, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, "../customer/customerEditInfo.html"))
        } 
    });

})

// Delete a customer Account
app.get("/deleteCustomerAccount", (req, res) => {
  const customerId = loggedUser_ID.customer_id;

  // Step 1: Delete the order items related to the customer’s orders
  let deleteOrderItemsSql = `DELETE FROM order_items WHERE order_id IN (SELECT order_id FROM orders WHERE customer_id = ${customerId})`;
  
  db.query(deleteOrderItemsSql, (err) => {
      if (err) {
          console.log("Error deleting order items:", err);
          res.status(500).send("Error deleting order items");
          return;
      }

      // Step 2: Delete the orders related to the customer
      let deleteOrdersSql = `DELETE FROM orders WHERE customer_id = ${customerId}`;
      db.query(deleteOrdersSql, (err, result) => {
          if (err) {
              console.log("Error deleting orders:", err);
              res.status(500).send("Error deleting orders");
              return;
          }

          // Step 3: After successfully deleting the orders, delete the customer
          let deleteCustomerSql = `DELETE FROM Customers WHERE customer_id = ${customerId}`;
          db.query(deleteCustomerSql, (err, result) => {
              if (err) {
                  console.log("Error deleting customer:", err);
                  res.status(500).send("Error deleting customer");
              } else {
                  
                  res.redirect('/');
              }
          });
      });
  });
});







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
            req.session.admin = {username};
            const redirectTo = req.session.returnTo || 'companyAccount';
            delete req.session.returnTo;
            res.redirect(redirectTo);
        } else {
            res.send(` <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./styles/normlize.css" />
    <link href="./styles/output.css" rel="stylesheet" />
    <title>Service Pro</title>
  </head>

  <body class="flex flex-col min-h-screen bg-gray-100">
    <!-- Header Section -->
    <header class="header bg-white py-2 md:py-4">
      <div class="container mx-auto flex items-center space-x-4">
        <img
          class="logo h-8 w-8 md:h-12 md:w-12"
          src="./assets/logo.jpg"
          alt="Service Pro Logo"
        />
        <a href="./customerLandingPage.html">
          <h1  class="company-name-place text-lg md:text-2xl font-bold" style="color: #10cab7">
            Company_Name
          </h1>
        </a>
      </div>
    </header>

    <!-- Main Content Section -->
    <div
      class="container mx-auto flex-grow p-4 md:p-8 flex items-center justify-center"
      id="content"
    >
      <div
        class="flex flex-col space-y-1.5 justify-center items-center bg-white rounded-lg shadow-md p-4"
      >
        <h2 class="text-2xl text-center">
          User Name or passwrod are incorrect!!!
        </h2>
        <div class="flex lg:flex-row flex-col lg:gap-6">
          <button
            class="block text-center bg-[#2c4755] text-white px-6 py-3 rounded-md hover:text-emerald-300 transition-colors duration-200 mt-4"
          >
            <a href="companyLogin" class="text-lg">Try again!</a>
          </button>
          
        </div>
      </div>
    </div>
    <!-- Footer Section -->
    <footer class="py-2 md:py-4 text-center bg-[#2c4755]">
      <p class="text-white">
        © 2024
        <span style="color: #10cab7">Service Pro</span>
        - All Rights Reserved
      </p>
    </footer>
    <script src="./js/services.js"></script>
  </body>
</html>
                `);
        }
    });
});
// Admin Logout
app.get('/api/AdminLogout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.send('Error logging out');
      }
      res.redirect('/admin');
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
    loggedAdmin_ID=updatedAdmin;
    let sql = `UPDATE Admins SET ? WHERE admin_id = ${loggedAdmin_ID.admin_id}`;
    db.query(sql, updatedAdmin, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, "../company/companyEditInfo.html"));
        } 
    });

})

// Delete a customer Account
app.get("/deleteAdminAccount", (req,res)=>{
   
    let sql = `DELETE FROM Admins WHERE admin_id = ${loggedAdmin_ID.admin_id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, "../landingPage.html"));
        } 
    });

})



var companyInfo = {
    company_address: "Montreal",
    company_name:"Pro Services",
};
// Update company info
app.post("/updateCompanyInfo",upload.single('companyLogo'), (req,res)=>{
    let updatedCompany={
        company_address:(req.body.companyAddress.length === 0)? companyInfo.company_address:req.body.companyAddress,
        company_name:(req.body.companyName.length === 0)? companyInfo.company_name:req.body.companyName,
        
    }
    companyInfo = updatedCompany;
    let sql = `UPDATE company_info SET ? `;
    db.query(sql, updatedCompany, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, "../company/companyEditInfo.html"));
        } 
    });

})
app.get('/api/getCompany', (req, res) => { // get company info
    const sql = `SELECT * FROM company_info`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.send('No customer found');
            }
        }
    });
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

app.get('/api/getLoggedUser', (req, res) => { // get a logged customer
    const sql = `SELECT * FROM Customers WHERE customer_id = ${loggedUser_ID.customer_id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.send('No customer found');
            }
        }
    });
});

app.get('/admins', (req, res) => { // get all customers to test if database works
  const sql = 'SELECT * FROM admins';
  db.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});


app.get('/api/getLoggedAdmin', (req, res) => { // get a logged admin 
    const sql = `SELECT * FROM Admins WHERE admin_id = ${loggedAdmin_ID.admin_id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.send('No customer found');
            }
        }
    });
});


app.get('/api/getServices', (req, res) => { // get all services
    const sql = "SELECT * FROM Services";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/api/customerOrder', (req, res) => { // purchase a service
  const customerID = loggedUser_ID.customer_id;
  const { purchasedServices, finalPrice, isPaid } = req.body;

  if (!customerID || !finalPrice || !Array.isArray(purchasedServices)) {
    console.log(customerID, finalPrice, isPaid);
    console.log("Invalid request data");
    return;
  }

  const insertOrderSQL = `
        INSERT INTO Orders (customer_id, purchase_date, total_amount, is_paid)
        VALUES (${customerID}, NOW(), ${finalPrice}, ${isPaid})
    `;

  db.query(insertOrderSQL, (err, orderResult) => {
    if (err) {
      console.log(err);
      return;
    }

    const orderId = orderResult.insertId;

    purchasedServices.forEach((service, index) => {
      const insertOrderItemSQL = `
            INSERT INTO Order_items (order_id, service_id, price_at_purchase)
            VALUES (${orderId}, ${service.service_id}, ${service.price})
        `;

      db.query(insertOrderItemSQL, (err) => {
        if (err) {
            console.log(err);
            return
        }
      });
    });    
  });

  console.log("Order placed successfully");
  res.send("Order placed successfully");
});


app.get('/api/getPastOrders', (req, res) => { // get all past orders
  const sql = `
        SELECT o.order_id, o.purchase_date, o.total_amount, o.is_paid,
               GROUP_CONCAT(s.label SEPARATOR ', ') AS service_labels
        FROM Orders o
        LEFT JOIN Order_items oi 
        ON o.order_id = oi.order_id
        LEFT JOIN Services s 
        ON oi.service_id = s.service_id
        WHERE o.customer_id = ${loggedUser_ID.customer_id}
        GROUP BY o.order_id
        ORDER BY o.purchase_date DESC
    `;
  db.query(sql, (err, result) => {
    if (err) {
        console.log(err);
        return;
      } 

      if (result.length === 0) {
        res.status(200).json("You haven't placed any orders yet!");
        return;
    }

    const orders = result.map((row) => ({
      order_id: row.order_id,
      purchase_date: row.purchase_date,
      total_amount: row.total_amount,
      is_paid: row.is_paid,
      service_labels: row.service_labels,
    }));
    
    res.status(200).json(orders);

  });
});

app.get('/api/updatePaymentStatus/:order_id', (req, res) => { // update payment status
  const orderId = req.params.order_id;
  const sql = `UPDATE Orders SET is_paid = 1 WHERE order_id = ${orderId}`;
  db.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});


// get all past orders Without a client ID (Company Facing)
app.get('/api/getCompanyPastOrders', (req, res) => { 
  const sql = `
        SELECT o.order_id, o.purchase_date, o.total_amount, o.is_paid,
               GROUP_CONCAT(s.label SEPARATOR ', ') AS service_labels
        FROM Orders o
        LEFT JOIN Order_items oi 
        ON o.order_id = oi.order_id
        LEFT JOIN Services s 
        ON oi.service_id = s.service_id
        WHERE o.customer_id = ${orderId.customer.first_name}
        GROUP BY o.order_id
        ORDER BY o.purchase_date DESC
        
    `;
  db.query(sql, (err, result) => {
    if (err) {
        console.log(err);
    } if (result.length === 0) {
      res.status(200).json("No orders found");
      return;
    }

    const orders = result.map((row) => ({

      order_id: row.order_id,
      purchase_date: row.purchase_date,
      total_amount: row.total_amount,
      is_paid: row.is_paid,
      service_labels: row.service_labels,
    }));

    res.status(200).json(orders);
  });
});


// Add a Service
app.post("/addService", (req,res)=>{
    
  let service={
      label:req.body.serviceName,
      price:req.body.servicePrice,
  }
  let sql = "INSERT INTO services SET ?";
  db.query(sql,service, (err, result) => {
      if (err) {
          console.log(err);
      } else {
          
          res.redirect('/editServices');
      }
  });

});

// Delete a Service
app.get("/deleteService/:id", (req,res)=>{
   
  let sql = `DELETE FROM services WHERE service_id = ${ req.params.id}`;
  db.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      } else {
        res.redirect('/editServices');
      } 
  });

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});