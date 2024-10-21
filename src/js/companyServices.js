document.addEventListener('DOMContentLoaded', loadServices);

// Function to add a new service
document.getElementById('add-service-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const serviceName = document.getElementById('new-service-name').value;
    const servicePrice = document.getElementById('new-service-price').value;
    if (serviceName.trim() !== "" && servicePrice.trim() !== "") {
        addService(serviceName, servicePrice);
        saveServices();
        document.getElementById('new-service-name').value = '';
        document.getElementById('new-service-price').value = '';
    }
});

// Function to add a service to the list
function addService(name, price) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="service-name">${name}</span> - 
        $<span class="service-price">${price}</span>
        <span>
            <button onclick="editService(this)">Edit</button>
            <button onclick="deleteService(this)">Delete</button>
        </span>
    `;
    document.getElementById('service-list').appendChild(li);
}

// Function to edit an existing service
function editService(button) {
    const li = button.parentElement.parentElement;
    const serviceName = li.querySelector('.service-name').textContent;
    const servicePrice = li.querySelector('.service-price').textContent;

    const newServiceName = prompt("Edit service name:", serviceName);
    const newServicePrice = prompt("Edit service price:", servicePrice);

    if (newServiceName !== null && newServiceName.trim() !== "") {
        li.querySelector('.service-name').textContent = newServiceName;
    }
    if (newServicePrice !== null && newServicePrice.trim() !== "") {
        li.querySelector('.service-price').textContent = newServicePrice;
    }

    saveServices();
}

// Function to delete a service
function deleteService(button) {
    if (confirm("Are you sure you want to delete this service?")) {
        const li = button.parentElement.parentElement;
        li.remove();
        saveServices();
    }
}

// Save services to localStorage
function saveServices() {
    const services = [];
    document.querySelectorAll('#service-list li').forEach(li => {
        const name = li.querySelector('.service-name').textContent;
        const price = li.querySelector('.service-price').textContent;
        services.push({ name, price });
    });
    localStorage.setItem('services', JSON.stringify(services));
}

// Load services from localStorage
function loadServices() {
    const services = JSON.parse(localStorage.getItem('services')) || [];
    services.forEach(service => {
        addService(service.name, service.price);
    });
}
