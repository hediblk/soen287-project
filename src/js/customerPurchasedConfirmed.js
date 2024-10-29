document.addEventListener("DOMContentLoaded", function () {
  const purchasedServices = JSON.parse(localStorage.getItem("purchasedServices")) || [{ name: "test", price: "100" }];
  const serviceDetailsDiv = document.getElementById("service-details");

  if (purchasedServices.length === 0) {
    serviceDetailsDiv.innerHTML = "<p>No services purchased.</p>";
  } else {
    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.toLocaleTimeString();

    // Display date and time at the top
    const dateTimeDiv = document.createElement("div");
    dateTimeDiv.className = "date-time";
    dateTimeDiv.innerHTML = `
      Date: ${date}<br>
      Time: ${time}<br><br>
    `;
    serviceDetailsDiv.appendChild(dateTimeDiv);

    // Display each service with its price
    purchasedServices.forEach((service) => {
      const serviceDiv = document.createElement("div");
      serviceDiv.className = "service-item";
      serviceDiv.innerHTML = `
        Service: ${service.name}<br>
        Price: $${service.price}<br><br>
      `;
      serviceDetailsDiv.appendChild(serviceDiv);
    });
  }
});
