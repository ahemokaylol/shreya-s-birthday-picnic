// smooth scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e) {

    e.preventDefault();

    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({
        behavior: "smooth"
      });

  });

});


// RSVP FORM

const form = document.getElementById("rsvp-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", async function(e) {

  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {

    form.reset();

    form.style.display = "none";

    successMessage.style.display = "block";

  }

});
});
