document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links li a");
  const hamburger = document.querySelector(".hamburger");
  const navLinksList = document.querySelector(".nav-links");

  function toggleMenu() {
    hamburger.classList.toggle("hamburger-active");
    navLinksList.classList.toggle("show");
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href");
      document.querySelector(target).scrollIntoView({
        behavior: "smooth",
      });

      // Close the menu when a link is clicked
      if (hamburger.classList.contains("hamburger-active")) {
        toggleMenu();
      }
    });
  });

  // Add event listener to the hamburger menu
  hamburger.addEventListener("click", toggleMenu);

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 2) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substr(1) === current) {
        link.classList.add("active");
      }
    });
  });

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const formMessages = document.getElementById("form-messages");

      fetch(event.target.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.ok) {
            formMessages.innerHTML =
              '<p style="color:green;">Your email has been successfully submitted. Thank you for sending it!</p>';
          } else {
            formMessages.innerHTML = `<p style="color:red;">Email sending failed. Please try again or contact me directly at <a href="mailto:Jamie@jfcostello.com">Jamie@jfcostello.com</a> or <a href="tel:4168009145">416 800 9145</a>.</p>`;
          }
        })
        .catch((error) => {
          formMessages.innerHTML = `<p style="color:red;">Email sending failed. Please try again or contact me directly at <a href="mailto:Jamie@jfcostello.com">Jamie@jfcostello.com</a> or <a href="tel:4168009145">416 800 9145</a>.</p>`;
        });
    });
});
