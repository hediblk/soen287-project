
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



  

  // document
  // .getElementById("login-form")
  // .addEventListener("submit", function (event) {
  //     event.preventDefault();
  //     const usernameInput = document.getElementById("username").value;
  //     const passwordInput = document.getElementById("password").value;
  //     var flag = false;
  //     var flag2 = false;
  //     clients.forEach(function(client){
  //         if(client.username == usernameInput){
  //             flag= true
  //         }
  //     })

  //     if(flag){
  //       clients.forEach(function(client){
  //             if(client.password == passwordInput){
  //                 flag2= true
  //             }
  //         })
  //         if(flag2){
  //             window.location.href = 'purchaseServices';
  //         }else{
  //             alert("password is Wrong!")
  //         }
  //     }else{
  //         alert("User Name is Wrong!")
  //     }
     

  // })
