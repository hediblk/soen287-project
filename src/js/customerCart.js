document.addEventListener('DOMContentLoaded', function() {
  let selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];
  const cartContainer = document.getElementById('cart-container');

  function updateCart() {
    cartContainer.innerHTML = ''; // Clear the current display

    if (selectedServices.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      const table = document.createElement('table');
      table.className = 'min-w-full bg-white';

      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th class="py-2 text-center">Service</th>
          <th class="py-2 text-center">Price</th>
          <th class="py-2 text-center">Action</th>
        </tr>
      `;
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      let totalPrice = 0;

      selectedServices.forEach((service, index) => {
        const row = document.createElement('tr');
        row.className = 'border-t';

        row.innerHTML = `
          <td class="py-2 text-center">${service.name}</td>
          <td class="py-2 text-center">$${service.price}</td>
          <td class="py-2 text-center">
            <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" data-index="${index}">Delete</button>
          </td>
        `;
        tbody.appendChild(row);

        totalPrice += parseFloat(service.price);
      });

      table.appendChild(tbody);
      cartContainer.appendChild(table);

      const taxes = totalPrice * 0.15;
      const finalPrice = totalPrice + taxes;

      const summaryDiv = document.createElement('div');
      summaryDiv.className = 'mt-4 p-4 bg-gray-100 rounded';
      summaryDiv.innerHTML = `
        <p class="text-lg">Total Price (before tax): $${totalPrice.toFixed(2)}</p>
        <p class="text-lg">Taxes (15%): $${taxes.toFixed(2)}</p>
        <p class="text-lg font-bold">Final Price: $${finalPrice.toFixed(2)}</p>
      `;
      cartContainer.appendChild(summaryDiv);

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

  // Clear selectedServices when the user leaves the page
  window.addEventListener('beforeunload', function() {
    selectedServices = [];
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
  });
});