
// Class Company
class Company {
  constructor(comapanyName, username, password) {
    this.comapanyName = comapanyName;
    this.username = username;
    this.password = password;
  }
}

//Array to hold our Companies 
let companies = [];


// Function to get the input of our clients and create an instant of the class Company
document
  .getElementById("create-account-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const companyName = document.getElementById("company-name").value; 
    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value; 
    const newCompany = new Company(companyName, username, password); 
    companies.push(newCompany);
    console.log(`Account created for ${companyName}:`, newCompany); 
    document.getElementById("create-account-form").reset();
  });



