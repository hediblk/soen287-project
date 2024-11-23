// Display the new company name
const company = JSON.parse(localStorage.getItem("companyInfo"));
const companyNamePlace = document.getElementsByClassName("company-name-place");
companyNamePlace[0].innerHTML = company.company_name;
companyNamePlace[1].innerHTML = company.company_name;

// Fetch and display past orders
async function fetchPastOrders() {
  try {
    const response = await fetch("/api/getPastOrders");
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
        const orderDiv = document.createElement("div");
        const date = order.purchase_date.split("T")[0];
        const time = order.purchase_date.split("T")[1].split(".")[0];
        orderDiv.className = "receipt-box bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full md:w-1/2 lg:w-1/3";
        orderDiv.innerHTML = `
            <h2 class="text-xl font-bold mb-2">Order number #${order.order_id}</h2>
            <p><strong>Service(s) Purchased:</strong> ${order.service_labels}</p>
            <p><strong>Total Price:</strong> $${order.total_amount.toFixed(2)}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Status:</strong> <span class="status-text">${order.is_paid ? "Paid" : "Unpaid"}</span></p>
            ${!order.is_paid ? '<button class="pay-button bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">Pay</button>' : ""}
        `;
        pastOrdersContainer.appendChild(orderDiv);

        if (!order.is_paid) {
            const payButton = orderDiv.querySelector(".pay-button");
            const statusText = orderDiv.querySelector(".status-text");
            payButton.addEventListener("click", async () => {
            try {
                const response = await fetch(`/api/updatePaymentStatus/${order.order_id}`, {
                method: "GET",
                });
                if (!response.ok) {
                throw new Error("Network response was not ok");
                }
                statusText.textContent = "Paid";
                payButton.remove(); // Remove the button from the DOM
            } catch (error) {
                
            }
        });
        }
    });
}

document.addEventListener("DOMContentLoaded", fetchPastOrders);
