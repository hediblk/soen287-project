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

console.log(clients);

// Function to get the input of our clients and create an instant of the class CLient
document
  .getElementById("create-account-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const newClient = new Client(firstName, lastName, username, password);
    clients.push(newClient);
    console.log(
      `Account created for ${firstName + " " + lastName}:`,
      newClient
    );
    document.getElementById("create-account-form").reset();
    console.log(clients);
  });

  