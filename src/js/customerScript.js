
  // Display the new company name
  const company = JSON.parse(localStorage.getItem("companyInfo"));
  const companyNamePlace = document.getElementById("company-name-place");
  companyNamePlace.innerHTML = company.company_name;

function showSignupForm() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "flex";
}

function showLoginForm() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "flex";
}

function login() {
  window.location.href = 'customerHome.html';
}



