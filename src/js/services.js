const storedServices = [
  { name: "Newcomer Package", price: "25.00" },
  { name: "Standard Package", price: "40.00" },
  { name: "Experienced Package", price: "75.00" },
  { name: "Deluxe Package", price: "100.00" },
  { name: "VIP Deluxe Package", price: "150.00" },
  { name: "King's Package", price: "250.00" },
];

localStorage.setItem("servicesArray", JSON.stringify(storedServices));
