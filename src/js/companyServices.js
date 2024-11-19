// Display the new company name
const company = JSON.parse(localStorage.getItem("companyInfo"));
const companyNamePlace = document.getElementById("company-name-place");
companyNamePlace.innerHTML = company.company_name;






// Load the services array from localStorage if available; otherwise, initialize an empty array
let servicesArray = JSON.parse(localStorage.getItem("servicesArray")) || [];

// Function to save the current servicesArray to localStorage
function saveServicesToLocalStorage() {
  localStorage.setItem("servicesArray", JSON.stringify(servicesArray));
}

// Function to add a new service
document.getElementById("add-service-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const serviceName = document.getElementById("new-service-name").value;
  const servicePrice = document.getElementById("new-service-price").value;

  if (serviceName.trim() !== "" && servicePrice.trim() !== "") {
    addService(serviceName, servicePrice);
    servicesArray.push({ name: serviceName, price: parseFloat(servicePrice).toFixed(2) }); // Add to the global array
    saveServicesToLocalStorage(); // Save updated array to localStorage
    printServices(); // Update the display
    document.getElementById("new-service-name").value = "";
    document.getElementById("new-service-price").value = "";
  }
});

// Function to add a service to the list in the DOM
function addService(name, price) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span class="service-name">${name}</span>
        <span class="service-price">$${parseFloat(price).toFixed(2)}</span>
        <span>
            <button onclick="editService(this)">Edit</button>
            <button onclick="deleteService(this)">Delete</button>
        </span>
    `;
  document.getElementById("service-list").appendChild(li);
}

// Function to edit an existing service
function editService(button) {
  const li = button.parentElement.parentElement;
  const serviceName = li.querySelector(".service-name").textContent;
  const servicePrice = li.querySelector(".service-price").textContent.replace("$", ""); // Remove dollar sign for editing

  const newServiceName = prompt("Edit service name:", serviceName);
  const newServicePrice = prompt("Edit service price:", servicePrice);

  if (newServiceName !== null && newServiceName.trim() !== "") {
    li.querySelector(".service-name").textContent = newServiceName;
  }
  if (newServicePrice !== null && !isNaN(newServicePrice)) {
    li.querySelector(".service-price").textContent = `$${parseFloat(newServicePrice).toFixed(2)}`;
  }

  updateServicesArray(); // Update the global array after editing
  saveServicesToLocalStorage(); // Save updated array to localStorage
  printServices(); // Update the display
}

// Function to delete a service
function deleteService(button) {
  if (confirm("Are you sure you want to delete this service?")) {
    const li = button.parentElement.parentElement;
    li.remove();

    updateServicesArray(); // Update the global array after deletion
    saveServicesToLocalStorage(); // Save updated array to localStorage
    printServices(); // Update the display
  }
}

// Function to update the servicesArray after an edit or delete operation
function updateServicesArray() {
  servicesArray = []; // Clear the array
  document.querySelectorAll("#service-list li").forEach((li) => {
    const name = li.querySelector(".service-name").textContent;
    const price = li.querySelector(".service-price").textContent.replace("$", ""); // Remove dollar sign before saving
    servicesArray.push({ name, price });
  });
}

// Function to display the services array in the HTML using map()
function printServices() {
  const servicesListDiv = document.getElementById("service-list");
  servicesListDiv.innerHTML = ""; // Clear the current display

  servicesArray.map((service) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="service-name">${service.name}</span>
            <span class="service-price">$${service.price}</span>
            <span>
                <button onclick="editService(this)">Edit</button>
                <button onclick="deleteService(this)">Delete</button>
            </span>
        `;
    servicesListDiv.appendChild(li);
  });
}

// Initially load services and display them on page load
document.addEventListener("DOMContentLoaded", function () {
  printServices(); // Display the initial services
});
