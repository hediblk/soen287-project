
function deleteAdminAccountFun(){
    window.location.href = 'deleteAdminAccount';
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
        const response = await fetch("/getLoggedAdmin");
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

    const companyNamePlace = document.getElementById("company-name-place");
    const logoPlace = document.getElementById("logo-place");
    const companyName = document.getElementById("display-company-name");
    const companyAddress = document.getElementById("display-company-address");
    const companyLogo = document.getElementById("display-company-logo");
    let company;
  
    (async () => {
      try {
        const response = await fetch("/getCompany");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        company = await response.json();
  
        // Update the DOM with fetched data
        if (company) {
            companyName.innerHTML = company.company_name || "Name not available";
            companyAddress.innerHTML = company.company_address || "Address not available";
            companyLogo.src="../assets/logo.jpg";
            companyNamePlace.innerHTML=company.company_name;
            logoPlace.src = "../assets/logo.jpg";
          
        } else {
          console.error("Company data is undefined");
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    })();



  });



  