export function calculateNetRevenue(gross, discount, fee) {
  return gross - discount - fee;
}

export function calculateNoShowRate(checkedIn, totalIssued) {
  if (totalIssued === 0) return 0;
  return 1 - (checkedIn / totalIssued);
}
