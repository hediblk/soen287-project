
function showSignupForm() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "flex";
}

function showLoginForm() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "flex";
}

function login() {
  window.location.href = 'customerHome.html';
}


// Class Client
class Client {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}

//Array to hold our CLients
let clients = [];

clients[0] = new Client("client1", "Client1", "client1", "go");

// Function to get the input of our clients and create an instant of the class CLient
document
  .getElementById("create-account-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const username = document.getElementById("username2").value;
    const password = document.getElementById("password2").value;
    const newClient = new Client(firstName, lastName, username, password);
    clients.push(newClient);
    console.log(
      `Account created for ${firstName + " " + lastName}:`,
      newClient
    );
    document.getElementById("create-account-form").reset();
    console.log(clients);
  });

  

  document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
      event.preventDefault();
      const usernameInput = document.getElementById("username").value;
      const passwordInput = document.getElementById("password").value;
      var flag = false;
      var flag2 = false;
      clients.forEach(function(client){
          if(client.username == usernameInput){
              flag= true
          }
      })

      if(flag){
        clients.forEach(function(client){
              if(client.password == passwordInput){
                  flag2= true
              }
          })
          if(flag2){
              window.location.href = 'purchaseServices';
          }else{
              alert("password is Wrong!")
          }
      }else{
          alert("User Name is Wrong!")
      }
     

  })
