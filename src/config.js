export const CONFIG = {
  // 1. PRODUCT CATALOG DATA LOADING
  // Set to true to fetch product list dynamically from a Google Sheet CSV export.
  // Set to false to use the hardcoded listings in products.js.
  USE_GOOGLE_SHEETS: false, 
  GOOGLE_SHEET_ID: "1_xYZ_SPREADSHEET_ID_HERE", // Replace with your actual Google Sheet ID
  GOOGLE_SHEET_GID: "0",                     // GID for the specific tab (usually "0" for the first sheet)

  // 2. INQUIRY FORM SUBMISSION DESTINATION
  // Mode options: 
  // 'mock'  - Local testing, prints form data to browser console and triggers success animation.
  // 'email' - Sends email via Web3Forms using EMAIL_ACCESS_KEY, hiding your email securely.
  // 'sheet' - Submits form as JSON payload to a custom Google Apps Script webhook URL.
  INQUIRY_DESTINATION: "mock", 

  // Option-specific credentials
  EMAIL_ACCESS_KEY: "YOUR_WEB3FORMS_ACCESS_KEY_HERE", 
  GOOGLE_SCRIPT_URL: "YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL_HERE"
};
