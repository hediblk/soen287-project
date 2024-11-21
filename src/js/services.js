document.addEventListener("DOMContentLoaded", () => {
  const companyNamePlace = document.getElementsByClassName("company-name-place");
  const logoPlace = document.getElementById("logo-place");
  let company;

  (async () => {
    try {
      const response = await fetch("/api/getCompany");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      company = await response.json();
      localStorage.setItem("companyInfo", JSON.stringify(company));
      // Update the DOM with fetched data
      if (company) {
        companyNamePlace[0].innerHTML = company.company_name;
        companyNamePlace[1].innerHTML = company.company_name;
        companyNamePlace[2].innerHTML = company.company_name;
      } else {
        console.error("Company data is undefined");
      }
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  })();
});

const storedServices = [
  { name: "Newcomer Package", price: "25.00" },
  { name: "Standard Package", price: "40.00" },
  { name: "Experienced Package", price: "75.00" },
  { name: "Deluxe Package", price: "100.00" },
  { name: "VIP Deluxe Package", price: "150.00" },
  { name: "King's Package", price: "250.00" },
];

if (!localStorage.getItem("servicesArray")) {
  localStorage.setItem("servicesArray", JSON.stringify(storedServices));
}
