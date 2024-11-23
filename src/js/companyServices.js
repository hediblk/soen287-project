// Display the new company name
const company = JSON.parse(localStorage.getItem("companyInfo"));
const companyNamePlace = document.getElementsByClassName("company-name-place");
companyNamePlace[0].innerHTML = company.company_name;
companyNamePlace[1].innerHTML = company.company_name;




async function fetchServices() {
  try {
    const response = await fetch("/api/getServices");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const services = await response.json();
    console.log("Services fetched:", services);
    return services;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}


// Function to save the current servicesArray to localStorage      ///////// THIS
function saveServicesToLocalStorage() {
  localStorage.setItem("servicesArray", JSON.stringify(servicesArray));
}

// Function to add a new service  ///////// THIS
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

// Function to add a service to the list in the DOM       ///////// THIS
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

// Function to delete a service              ///////// THIS
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
  servicesArray = [];
  document.querySelectorAll("#service-list li").forEach((li) => {
    const name = li.querySelector(".service-name").textContent;
    const price = li.querySelector(".service-price").textContent.replace("$", ""); // Remove dollar sign before saving
    servicesArray.push({ name, price });
  });
}


async function printServices() {
  const servicesListDiv = document.getElementById("service-list");
  servicesListDiv.innerHTML = "";

  const storedServices = await fetchServices();

  storedServices.map((service) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="service-name">${service.label}</span>
            <span class="service-price">$${service.price}</span>
            <span>
                <button onclick="editService(this)">Edit</button>
                <button onclick="deleteService(this)">Delete</button>
            </span>
        `;
    servicesListDiv.appendChild(li);
  });
}


document.addEventListener("DOMContentLoaded", function () {
  printServices();
});
