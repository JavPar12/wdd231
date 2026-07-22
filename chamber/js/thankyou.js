/*
  thankyou.js
  Thank-you page only. Because the join form uses method="get", the
  submitted values arrive as URL query parameters (e.g. ?firstName=...).
  This reads them and displays the required fields back to the user.
  Author: Luis Pardo — WDD 231
*/

const params = new URLSearchParams(window.location.search);

// Maps each field's URL parameter name to the <span> that displays it.
const fieldMap = {
  firstName: "#summary-first-name",
  lastName: "#summary-last-name",
  email: "#summary-email",
  mobilePhone: "#summary-phone",
  businessName: "#summary-business",
  timestamp: "#summary-timestamp",
};

Object.entries(fieldMap).forEach(([paramName, selector]) => {
  const value = params.get(paramName);
  const el = document.querySelector(selector);

  if (paramName === "timestamp" && value) {
    // Reformat the ISO timestamp into a readable local date/time.
    el.textContent = new Date(value).toLocaleString();
  } else {
    el.textContent = value || "\u2014";
  }
});
