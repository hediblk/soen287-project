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




// Function to edit an existing service
async function editService(button) {
  const storedServices = await fetchServices();
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

  let serviceToEdit = storedServices.find(
    (service) => service.label.trim().toLowerCase() === serviceName.toLowerCase()
  );

  fetch(`/api/editService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      label: newServiceName,
      price: newServicePrice,
      service_id: serviceToEdit.service_id,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Service edited successfully");
    })
    .catch((error) => {
      console.error("Failed to edit service:", error);
    });

}

// Function to delete a service              
async function deleteService(button) {
  if (confirm("Are you sure you want to delete this service?")) {
    const storedServices = await fetchServices();
    const parentElement = button.parentElement.parentElement;

    // Get the content of the first <span> within the parent element
    const serviceName = parentElement.querySelector('.service-name').textContent;
    let serviceToDelete=storedServices.find(
      (service) => service.label.trim().toLowerCase() === serviceName.toLowerCase()
    );
   
    window.location.href = `/api/deleteService/${serviceToDelete.service_id}`;
  }
}

async function printServices() {
  const servicesListDiv = document.getElementById("service-list");
  servicesListDiv.innerHTML = "";

  const storedServices = await fetchServices();

  storedServices.map((service) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="service-name">${service.label}</span>
            <span class="service-price">$${parseFloat(service.price).toFixed(2)}</span>
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
