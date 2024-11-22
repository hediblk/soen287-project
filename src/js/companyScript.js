// Display the new company name
const company = JSON.parse(localStorage.getItem("companyInfo"));
const companyNamePlace = document.getElementsByClassName("company-name-place");
companyNamePlace[0].innerHTML = company.company_name;
companyNamePlace[1].innerHTML = company.company_name;

const username = document.getElementById("username2");
var admins;
document.addEventListener("DOMContentLoaded", () => {
    (async () => {
      try {
        const response = await fetch("/admins");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        admins = await response.json();
        // Update the DOM with fetched data
        if (admins) {
        } else {
          console.error("Admins data is undefined");
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    })();
  
});

var valid;
function validateUserName(){
  valid=true;
  for (let i = 0; i < admins.length; i++){
     if(username.value == admins[i].username){
        valid = false;
        break;
     }
  }
  if(valid){
    document.getElementById("validUser").style.display="flex";
    document.getElementById("invalidUser").style.display="none";
    if(password.value.length>8 && password.value == reenteredPassword.value){
      document.getElementById("createAccountBtn").disabled =false;
    }else{
      document.getElementById("createAccountBtn").disabled =true;
    }
    
  }else{
    document.getElementById("invalidUser").style.display="flex";
    document.getElementById("validUser").style.display="none";
    document.getElementById("createAccountBtn").disabled =true;
  }
}



const password = document.getElementById("password2");
const reenteredPassword = document.getElementById("confirm-password");


function validatePassword(){
  if(valid){
    if(password.value.length>8){
      document.getElementById("validPassword").style.display="flex";
      document.getElementById("invalidPassword").style.display="none";
      if(password.value == reenteredPassword.value){
        document.getElementById("createAccountBtn").disabled =false;
      }else{
        document.getElementById("createAccountBtn").disabled =true;
      }
    }else{
      document.getElementById("invalidPassword").style.display="flex";
      document.getElementById("validPassword").style.display="none";
      document.getElementById("createAccountBtn").disabled =true;
    }
  }else{
    document.getElementById("invalidPassword").style.display="none";
      document.getElementById("validPassword").style.display="none";
      document.getElementById("createAccountBtn").disabled =true;
  }
  
}

function confirmPassword(){
  if(password.value.length>8 && valid){
    if(password.value == reenteredPassword.value){
      document.getElementById("matchedPassword").style.display="flex";
      document.getElementById("unmatchedPassword").style.display="none";
      document.getElementById("createAccountBtn").disabled =false;
    }else{
      document.getElementById("unmatchedPassword").style.display="flex";
      document.getElementById("matchedPassword").style.display="none";
      document.getElementById("createAccountBtn").disabled =true;
    }
  }else{
    document.getElementById("unmatchedPassword").style.display="none";
    document.getElementById("matchedPassword").style.display="none";
    document.getElementById("createAccountBtn").disabled =true;
  }

}




  function showSignupForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "flex";
  }

  function showLoginForm() {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "flex";
  }






function login() {
  window.location.href = 'companyHome.html';
}


