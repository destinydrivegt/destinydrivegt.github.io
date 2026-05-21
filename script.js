const currency = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  maximumFractionDigits: 0,
});

const fields = {
  truckCount: document.querySelector("#truckCount"),
  customerRate: document.querySelector("#customerRate"),
  vendorRate: document.querySelector("#vendorRate"),
  advancePercent: document.querySelector("#advancePercent"),
  waitingCharge: document.querySelector("#waitingCharge"),
  waitingTrucks: document.querySelector("#waitingTrucks"),
};

const outputs = {
  customerInvoice: document.querySelector("#customerInvoice"),
  vendorBills: document.querySelector("#vendorBills"),
  customerAdvance: document.querySelector("#customerAdvance"),
  vendorAdvance: document.querySelector("#vendorAdvance"),
  grossMargin: document.querySelector("#grossMargin"),
};

function numericValue(input) {
  return Number.parseFloat(input.value) || 0;
}

function updateSettlement() {
  const truckCount = numericValue(fields.truckCount);
  const customerRate = numericValue(fields.customerRate);
  const vendorRate = numericValue(fields.vendorRate);
  const advancePercent = numericValue(fields.advancePercent) / 100;
  const waitingCharge = numericValue(fields.waitingCharge);
  const waitingTrucks = Math.min(numericValue(fields.waitingTrucks), truckCount);

  const baseRevenue = truckCount * customerRate;
  const baseCost = truckCount * vendorRate;
  const waitingTotal = waitingTrucks * waitingCharge;
  const customerInvoice = baseRevenue + waitingTotal;
  const vendorBills = baseCost + waitingTotal;
  const customerAdvance = baseRevenue * advancePercent;
  const vendorAdvance = baseCost * advancePercent;
  const grossMargin = customerInvoice - vendorBills;

  outputs.customerInvoice.textContent = currency.format(customerInvoice);
  outputs.vendorBills.textContent = currency.format(vendorBills);
  outputs.customerAdvance.textContent = currency.format(customerAdvance);
  outputs.vendorAdvance.textContent = currency.format(vendorAdvance);
  outputs.grossMargin.textContent = currency.format(grossMargin);
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", updateSettlement);
});

updateSettlement();
