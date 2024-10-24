import { servicesArray } from './services.js';

let selectedServices = JSON.parse(localStorage.getItem("selectedServices")) || [];


// Function to display the services array in the HTML
export function displayServices() {
  const servicesContainer = document.getElementById("services-container");
  servicesContainer.innerHTML = ""; // Clear the current display

  servicesArray.forEach((service, index) => {
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
      const selectedService = servicesArray[index];
      selectedServices.push(selectedService);
      localStorage.setItem("selectedServices", JSON.stringify(selectedServices)); // Store in local storage
      console.log("Selected Services:", selectedServices); // For debugging

      // Change button text and color
      event.target.textContent = "Added";
      event.target.classList.remove("hover:bg-teal-700");
      event.target.disabled = true; // Disable the button to prevent multiple additions
    });
  });
}

document.addEventListener('DOMContentLoaded', displayServices);