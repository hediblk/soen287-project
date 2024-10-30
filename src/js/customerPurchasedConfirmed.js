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
      <strong>Date:</strong>${date}<br>
      <strong>Time:</strong> ${time}<br><br>
    `;
    serviceDetailsDiv.appendChild(dateTimeDiv);

    // Display each service with its price
    purchasedServices.forEach((service) => {
      const serviceDiv = document.createElement("div");
      serviceDiv.className = "service-item";
      serviceDiv.innerHTML = `
        <strong>Service: </strong>${service.name}<br>
        <strong>Price:</strong> $${service.price}<br><br>
      `;
      serviceDetailsDiv.appendChild(serviceDiv);
    });
  }
});
