      // Display the new company name
      const company = JSON.parse(localStorage.getItem("companyInfo"));
      const companyNamePlace = document.getElementById("company-name-place");
      companyNamePlace.innerHTML = company.company_name;

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
