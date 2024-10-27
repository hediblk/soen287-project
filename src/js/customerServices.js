const storedServices = JSON.parse(localStorage.getItem("servicesArray")) || [{ name: "test", price: "100" }];
const selectedServices = JSON.parse(localStorage.getItem("selectedServices")) || [];

// Function to display the services array in the HTML
export function displayServices() {
  const servicesContainer = document.getElementById("services-container");
  servicesContainer.innerHTML = ""; // Clear the current display

  storedServices.forEach((service, index) => {
    const serviceDiv = document.createElement("div");
    serviceDiv.className = "bg-white p-4 rounded shadow w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-0.75rem)]";
    serviceDiv.innerHTML = `
      <h2 class="text-lg font-bold">${service.name}</h2>
      <p class="text-gray-500">$${service.price}</p>
      <button class="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded" data-index="${index}">+ Add</button>
    `;
    servicesContainer.appendChild(serviceDiv);
  });

  // Add event listeners to all "+ Add" buttons
  const addButtons = servicesContainer.querySelectorAll("button");
  addButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      const selectedService = storedServices[index];
      selectedServices.push(selectedService);
      localStorage.setItem("selectedServices", JSON.stringify(selectedServices)); // Store in local storage

      // Change button text and color
      event.target.textContent = "Added";
      event.target.classList.add("cursor-not-allowed");
      event.target.classList.replace("bg-teal-600", "bg-gray-400");
      event.target.classList.remove("hover:bg-teal-700");
      event.target.disabled = true; // Disable the button to prevent multiple additions
    });
  });
}

// Function to reset the buttons to their original state
function resetButtons() {
  const addButtons = document.querySelectorAll("button");
  addButtons.forEach((button) => {
    button.textContent = "+ Add";
    button.classList.remove("cursor-not-allowed");
    button.classList.replace("bg-gray-400", "bg-teal-600");
    button.classList.add("hover:bg-teal-700");
    button.disabled = false;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayServices();
  resetButtons();
});

// Reset buttons when the user leaves the page
window.addEventListener("beforeunload", function () {
  resetButtons();
});
