const quoteForm = document.querySelector(".lead-form");

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(quoteForm);
  const request = [
    "Road freight quote request",
    "",
    `Name: ${data.get("name") || ""}`,
    `Phone / WhatsApp: ${data.get("phone") || ""}`,
    `Company: ${data.get("company") || ""}`,
    `Pickup: ${data.get("pickup") || ""}`,
    `Delivery: ${data.get("delivery") || ""}`,
    `Truck / cargo requirement: ${data.get("cargo") || ""}`,
    `Shipment details: ${data.get("details") || ""}`,
  ].join("\n");

  const note = document.querySelector("#formNote");
  if (note) {
    note.textContent =
      "Quote request prepared. Your email app will open so you can send it.";
  }

  window.location.href = `mailto:?subject=${encodeURIComponent(
    "Road freight quote request"
  )}&body=${encodeURIComponent(request)}`;
});
