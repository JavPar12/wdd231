// Current year in the footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Date the document was last modified
document.getElementById("lastModified").textContent =
  `Last Modification: ${document.lastModified}`;
