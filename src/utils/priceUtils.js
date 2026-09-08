export const EXCHANGE_RATE = 84; // Approx 1 USD = 84 INR (Adjust as needed)

export const formatPriceWithUSD = (priceStr) => {
  if (!priceStr && priceStr !== 0) return '';
  
  const str = String(priceStr);
  
  // Extract number from string, e.g., "₹2,00,000" -> 200000
  const numericMatch = str.match(/[\d,]+/);
  if (numericMatch) {
    const rawNumber = parseInt(numericMatch[0].replace(/,/g, ''), 10);
    if (!isNaN(rawNumber)) {
      // Clean up the original string if they had "USD" at the end as a placeholder
      let cleanPriceStr = str.replace(/\s*USD\s*$/i, '');
      
      return cleanPriceStr;
    }
  }
  
  return priceStr;
};
