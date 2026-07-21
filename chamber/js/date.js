/*
  date.js
  Shared across every chamber page. Fills in the footer's copyright
  year and this document's last-modified date, straight from the browser.
  Author: Luis Pardo — WDD 231
*/

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;
