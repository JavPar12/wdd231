const hamburger = document.getElementById("hamburger");
const primaryNav = document.getElementById("primary-nav");

hamburger.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Close the menu automatically when a link is selected (useful on mobile)
const navLinks = primaryNav.querySelectorAll("a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});
