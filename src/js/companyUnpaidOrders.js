// Display the new company name
const company = JSON.parse(localStorage.getItem("companyInfo"));
const companyNamePlace = document.getElementsByClassName("company-name-place");
companyNamePlace[0].innerHTML = company.company_name;
companyNamePlace[1].innerHTML = company.company_name;

// Fetch and display past orders
async function fetchPastOrders() {
  try {
    const response = await fetch("/api/getCompanyPastOrders");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (typeof data === "string") {
        displayNoOrdersMessage(data);
    } else {
        displayPastOrders(data);
    }
    } catch (error) {
        console.error("Failed to fetch past orders:", error);
    }
}

function displayNoOrdersMessage(message) {
    const pastOrdersContainer = document.getElementById("past-orders-container");
    pastOrdersContainer.innerHTML = `<p>${message}</p>`;
}

function displayPastOrders(pastOrders) {
    const pastOrdersContainer = document.getElementById("past-orders-container");
    pastOrdersContainer.innerHTML = "";

    pastOrders.forEach((order) => {
        if (!order.is_paid){
        const orderDiv = document.createElement("div");
        const date = order.purchase_date.split("T")[0];
        const time = order.purchase_date.split("T")[1].split(".")[0];
        orderDiv.className = "receipt-box bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full md:w-1/2 lg:w-1/3";
        orderDiv.innerHTML = `
            <h2 class="text-xl font-bold mb-2">Order number #${order.order_id}</h2>
            <p><strong>Customer Name:</strong>${order.customer_id}</p>
            <p><strong>Service(s) Purchased:</strong> ${order.service_labels}</p>
            <p><strong>Total Price:</strong> $${order.total_amount.toFixed(2)}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
        `;
        pastOrdersContainer.appendChild(orderDiv);
    }
}
);
}




document.addEventListener("DOMContentLoaded", fetchPastOrders);