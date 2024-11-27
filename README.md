# soen287-project
This is a group project for the SOEN 287 class at Concordia University. The project is a web application that allows companies to offer services to customers and customers to book those services.

### Group Members
| Name              | Student ID| 
|-------------------|-----------|
| Hedi Belkahia     | #40256678 | 
| Durid Danhash     | #40262962 |
| Jakob Cote        | #40177325 |


### Technologies used
We are using **HTML**, **CSS**, and **JavaScript** for the frontend. **tailwindcss** is also used for styling.

**Node.js** and **MySQL** are used for the backend.


## User Guide
**Please make sure to follow the `Running the project` section below to run the project properly.**

We have included 2 types of users in the project: **Company** and **Customer**. Both have one hard accounts (it is always possible to dynamically create new ones of course). The login credentials are as follows:<br>
- **Company**: username: `admin1`, password: `go`<br>
- **Customer 1**: username: `customer1`, password: `go`<br>
- **Customer 2**: username: `customer2`, password: `go`<br>

The main entry point of the project is the `/` route. From there, you can navigate to the login/signup page and login with the credentials above for the **Customer** account. This will take you to the customer dashboard where you can choose to purchase services, edit account information, and view past orders. You can also delete the account.

The **purchase services** page displays a list of services offered by the company. You can add as many services as you want to the cart and then proceed to checkout. The cart page displays the services you have added and allows you to remove them. You can also see the before tax price aswell as the total price (assuming a 15% tax rate). Once you are satisfied with your selection, you can choose to "pay now" or "pay later". You can proceed to checkout by clicking the `Order` button. This will simulate a purchase and display a confirmation message with the services selected, amount paid and date and time of purchase.


You can navigate to the **company** side of the project by going to the `/admin ` route. Once logged in, you will see a dashboard that allows you to edit account and company information (includingg company name and logo that dynamically change across the app), add services, and view services sold (you can view all services sold along with a list of ones that are still unpaid). You can also delete the account.

The **edit company services** page displays a list of current offered services. You can add a new service by clicking the `Add Service` button. You can also edit or delete existing services. These services are automatically updated in the database so instantly available to customers for purchase.


## Running the project
1. Clone the repository
2. Run `npm install` to install the dependencies.
3. To build the CSS file using tailwind, run:<br>`npx tailwindcss -i src/styles/input.css -o src/styles/output.css --watch`.
4. Start the MySQL database from the XAMPP app.
5. Run `node src/server/server.js` to start the server, using **nodemon** instead of node works fine too.
6. Go to `localhost:3000` in your browser.
7. Use the login credentials mentioned above to login or create your own.
