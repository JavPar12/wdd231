/*
  navigation.js
  Shared across every chamber page. Expands/collapses the mobile nav
  menu beneath the header when the hamburger button is clicked.
  Author: Luis Pardo — WDD 231
*/

const navToggle = document.querySelector("#nav-toggle");
const primaryNav = document.querySelector("#primary-nav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
