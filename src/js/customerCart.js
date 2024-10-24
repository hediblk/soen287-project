document.addEventListener('DOMContentLoaded', function() {
  let selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];
  const cartContainer = document.getElementById('cart-container');

  function updateCart() {
    cartContainer.innerHTML = ''; // Clear the current display

    if (selectedServices.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      selectedServices.forEach((service, index) => {
        const serviceDiv = document.createElement('div');
        serviceDiv.className = 'bg-white p-4 rounded shadow mb-4';
        serviceDiv.innerHTML = `
          <h2 class="text-lg font-bold">${service.name}</h2>
          <p class="text-gray-500">$${service.price}</p>
          <button class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(serviceDiv);
      });

      // Add event listeners to all "Remove" buttons
      const removeButtons = cartContainer.querySelectorAll('button');
      removeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          selectedServices.splice(index, 1); // Remove the service from the array
          localStorage.setItem('selectedServices', JSON.stringify(selectedServices)); // Update local storage
          updateCart(); // Update the cart display
        });
      });
    }
  }

  updateCart(); // Initial display of the cart
});