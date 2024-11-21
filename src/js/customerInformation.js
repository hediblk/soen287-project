 // Display the new company name
const company = JSON.parse(localStorage.getItem("companyInfo"));
const companyNamePlace = document.getElementsByClassName("company-name-place");
companyNamePlace[0].innerHTML = company.company_name;
companyNamePlace[1].innerHTML = company.company_name;

  
function deleteCustomerAccountFun() {
    window.location.href = "deleteCustomerAccount";
  }

document.addEventListener("DOMContentLoaded", () => {
   

    const firstName = document.getElementById("display-first-name");
    const lastName = document.getElementById("display-last-name");
    const username = document.getElementById("display-username");
    const email = document.getElementById("display-email");
    const address = document.getElementById("display-address");
    let loggedUser;
  
    (async () => {
      try {
        const response = await fetch("/api/getLoggedUser");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        loggedUser = await response.json();
  
        // Update the DOM with fetched data
        if (loggedUser) {
          firstName.innerHTML = loggedUser.first_name || "Name not available";
          lastName.innerHTML = loggedUser.last_name || "Name not available";
          username.innerHTML = loggedUser.username || "Name not available";
          email.innerHTML = loggedUser.email || "Name not available";
          address.innerHTML = loggedUser.address || "Address not available";
        } else {
          console.error("Logged user data is undefined");
        }
      } catch (error) {
        console.error("Error fetching logged user:", error);
      }
    })();
  });


