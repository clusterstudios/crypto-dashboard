// utils.js

function generateThumbnailGraphUrl(historicalPriceData) {
    // Extract price values from historicalPriceData
    const prices = historicalPriceData;
  
    // Determine the color based on the price change over the period
    const initialPrice = prices[0];
    const finalPrice = prices[prices.length - 1];
    const percentageChange = ((finalPrice - initialPrice) / initialPrice) * 100;
  
    const color = percentageChange >= 0 ? 'green' : 'red';
    const width = 30;
    const height = 20;
    return `https://via.placeholder.com/${width}x${height}/${color}?text=${percentageChange.toFixed(2)}%`;
  }
  
  export { generateThumbnailGraphUrl };
  