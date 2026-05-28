// SMOOTH SCROLL

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e) {

    e.preventDefault();

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (target) {

      target.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});



// RSVP FORM SUBMISSION

const form = document.getElementById("rsvp-form");
const successMessage = document.getElementById("success-message");

if (form) {

  form.addEventListener("submit", async function(e) {

    e.preventDefault();

    const formData = new FormData(form);

    try {

      const response = await fetch(form.action, {

        method: "POST",

        body: formData,

        headers: {
          "Accept": "application/json"
        }

      });

      if (response.ok) {

        form.reset();

        form.style.display = "none";

        successMessage.style.display = "block";

      } else {

        alert("something went wrong :( try again");

      }

    } catch (error) {

      alert("connection error :( try again");

    }

  });

}
