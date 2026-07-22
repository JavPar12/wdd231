/*
  join.js
  Join page only. Sets the hidden timestamp field to the moment the form
  loaded, and opens/closes the native <dialog> modals for each
  membership level's benefits.
  Author: Luis Pardo — WDD 231
*/

// Records the exact date/time the form was loaded, as required by the
// hidden "timestamp" field. Stored as an ISO string so thankyou.html
// can parse and reformat it reliably.
document.querySelector("#timestamp").value = new Date().toISOString();

// Wires up each "Learn more" link to open its matching <dialog> modal,
// and each modal's close button to close it again.
const modalLinks = document.querySelectorAll("[data-modal-target]");

modalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const modal = document.querySelector(link.dataset.modalTarget);
    modal.showModal();
  });
});

const closeButtons = document.querySelectorAll(".modal-close");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

// Clicking the backdrop (outside the modal content) also closes it.
const dialogs = document.querySelectorAll("dialog.benefit-modal");

dialogs.forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});
