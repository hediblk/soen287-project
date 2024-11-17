document.addEventListener('DOMContentLoaded', loadCompanyInfo);

const form = document.getElementById('company-info-form');



function deleteAdminAccountFun(){
    window.location.href = 'deleteAdminAccount';
}


// Save company information to localStorage
function saveCompanyInfo(name, address, logo) {
    // Store name and address
    localStorage.setItem('companyName', name);
    localStorage.setItem('companyAddress', address);

    // Convert image file to Base64 and store in localStorage
    if (logo) {
        const reader = new FileReader();
        reader.onloadend = function() {
            localStorage.setItem('companyLogo', reader.result);
            displayCompanyInfo();
        };
        reader.readAsDataURL(logo);
    } else {
        displayCompanyInfo();
    }
}

// Load company information from localStorage
function loadCompanyInfo() {
    const name = localStorage.getItem('companyName');
    const address = localStorage.getItem('companyAddress');
    const logo = localStorage.getItem('companyLogo');

    if (name) document.getElementById('company-name').value = name;
    if (address) document.getElementById('company-address').value = address;
    if (logo) document.getElementById('display-company-logo').src = logo;

    displayCompanyInfo();
}

// Display the current company information
function displayCompanyInfo() {
    document.getElementById('display-company-name').textContent = localStorage.getItem('companyName');
    document.getElementById('display-company-address').textContent = localStorage.getItem('companyAddress');

    const logo = localStorage.getItem('companyLogo');
    if (logo) {
        document.getElementById('display-company-logo').src = logo;
    }
}
