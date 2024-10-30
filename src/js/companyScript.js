

  function showSignupForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "flex";
  }

  function showLoginForm() {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "flex";
  }






function login() {
  window.location.href = 'companyHome.html';
}



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


companies[0] = new Company("Company1", "company1", "go");




// Function to get the input of our clients and create an instant of the class Company
document
  .getElementById("create-account-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const companyName = document.getElementById("company-name").value; 
    const username = document.getElementById("username2").value; 
    const password = document.getElementById("password2").value; 
    const newCompany = new Company(companyName, username, password); 
    companies.push(newCompany);
    console.log(`Account created for ${companyName}:`, newCompany); 
    const element = document.getElementById("signup-container");
    element.style.display = "none";
    document.getElementById("create-account-form").reset();
  });



  document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
      event.preventDefault();
      const usernameInput = document.getElementById("username").value;
      const passwordInput = document.getElementById("password").value;
      var flag = false;
      var flag2 = false;
      companies.forEach(function(comp){
          if(comp.username == usernameInput){
              flag= true
          }
      })

      if(flag){
          companies.forEach(function(comp){
              if(comp.password == passwordInput){
                  flag2= true
              }
          })
          if(flag2){
              window.location.href = 'companyHome.html';
          }else{
              alert("password is Wrong!")
          }
      }else{
          alert("User Name is Wrong!")
      }
     

  })
