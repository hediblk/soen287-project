

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




