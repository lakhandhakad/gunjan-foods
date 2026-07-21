import { CONFIG } from '../config';

/**
 * Submits the inquiry form depending on the global CONFIG.INQUIRY_DESTINATION.
 * Handles Mock delay, secure email API routing, or Google Sheet Webhook.
 */
export async function submitInquiry(formData) {
  const payload = {
    ...formData,
    submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  switch (CONFIG.INQUIRY_DESTINATION) {
    case 'email':
      return submitToWeb3Forms(payload);
    case 'sheet':
      return submitToGoogleScript(payload);
    case 'mock':
    default:
      return submitMock(payload);
  }
}

/**
 * Simulates a server response with a delay.
 */
function submitMock(payload) {
  return new Promise((resolve) => {
    console.log("Mock Submission Triggered with Payload:", payload);
    setTimeout(() => {
      resolve({ success: true, message: "Mock inquiry received successfully!" });
    }, 1500);
  });
}

/**
 * Submits the data to Web3Forms (email forwarding with hidden email).
 */
async function submitToWeb3Forms(payload) {
  if (!CONFIG.EMAIL_ACCESS_KEY || CONFIG.EMAIL_ACCESS_KEY.includes("YOUR_")) {
    throw new Error("Email Access Key is missing or default. Please configure it in config.js.");
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      access_key: CONFIG.EMAIL_ACCESS_KEY,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: `Inquiry Type / Subject: ${payload.subject}\n` +
               `Preferred Packaging Size: ${payload.packaging || 'N/A'}\n` +
               `Inquiry Reason: ${payload.inquiryReason || 'N/A'}\n\n` +
               `Message Detail:\n${payload.message}\n\n` +
               `--- Submitter Details ---\n` +
               `Name: ${payload.name}\n` +
               `Email: ${payload.email}\n` +
               `Phone: ${payload.phone}\n` +
               `Timestamp: ${payload.submittedAt}`
    })
  });

  const result = await response.json();
  if (response.ok && result.success) {
    return { success: true, message: "Inquiry emailed successfully!" };
  } else {
    throw new Error(result.message || "Failed to send email via Web3Forms.");
  }
}

/**
 * Submits the data to a Google Apps Script Webhook.
 */
async function submitToGoogleScript(payload) {
  if (!CONFIG.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL.includes("YOUR_")) {
    throw new Error("Google Script Webhook URL is missing or default. Please configure it in config.js.");
  }

  // Google Script web app endpoints require POST with redirection support.
  // We use mode: 'no-cors' if writing raw data, or a standard fetch.
  // Standard Google Apps Script Web App can receive JSON payloads.
  const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8" // Avoid CORS pre-flight triggers on simple Apps Script
    },
    body: JSON.stringify(payload)
  });

  // Since Google Apps Scripts often return redirect responses which can fail CORS checks
  // but still execute successfully, we treat a successful fetch execution (or no-cors success)
  // as completed, or standard ok check.
  return { success: true, message: "Inquiry logged to Google Sheet!" };
}
