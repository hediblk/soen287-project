// Display the new company name
const company = JSON.parse(localStorage.getItem("companyInfo"));
const companyNamePlace = document.getElementsByClassName("company-name-place");
companyNamePlace[0].innerHTML = company.company_name;
companyNamePlace[1].innerHTML = company.company_name;



document.addEventListener("DOMContentLoaded", function () {
  const purchasedServices = JSON.parse(localStorage.getItem("purchasedServices")) || [{ name: "test", price: "100" }];
  const serviceDetailsDiv = document.getElementById("service-details");

  if (purchasedServices.length === 0) {
    serviceDetailsDiv.innerHTML = "<p>No services purchased.</p>";
  } else {
    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.toLocaleTimeString();
    const finalPrice = parseFloat(localStorage.getItem("finalPrice"), 10);
    const isPaid = parseInt(localStorage.getItem("isPaid"));

    fetch("/api/customerOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ purchasedServices, finalPrice, isPaid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    
    // Display date and time at the top
    const dateTimeDiv = document.createElement("div");
    dateTimeDiv.className = "date-time";
    dateTimeDiv.innerHTML = `
    <strong>Order number #1111</strong><br>
    <strong>Final Price: $</strong>${finalPrice.toFixed(2)}<br>
    <strong>Date:</strong>${date}<br>
    <strong>Time:</strong> ${time}<br><br>
    `;
    serviceDetailsDiv.appendChild(dateTimeDiv);
    
    // Display each service with its price
    purchasedServices.forEach((service) => {
      const serviceDiv = document.createElement("div");
      serviceDiv.className = "service-item";
      serviceDiv.innerHTML = `
      <strong>Service: </strong>${service.label}<br>
      <strong>Price:</strong> $${service.price}<br><br>
      `;
      serviceDetailsDiv.appendChild(serviceDiv);
    });

    //localStorage.removeItem("finalPrice");
    //purchasedServices = [];
    //localStorage.setItem("purchasedServices", JSON.stringify(purchasedServices));
  }
});
