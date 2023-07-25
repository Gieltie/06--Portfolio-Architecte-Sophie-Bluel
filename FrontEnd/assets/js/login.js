// Je recupere mes balises dans le dom
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const form = document.getElementById("userLogin");
const errorDisplay = document.querySelector(".error");

// J'ecoute le submit du bouton de mon login
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Je stock les valeur des mes variables
  const stockEmailInput = emailInput.value;
  const stockPasswordInput = passwordInput.value;

  // Je fait la requéte a l'API
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: stockEmailInput,
      password: stockPasswordInput,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        errorDisplay.innerHTML = "Nous n'avons pas trouvé votre adresse mail";
        form.reset();
      } else {
        errorDisplay.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
        form.reset();
      }
    })
    .then((data) => {
      if (data.token) {
        // Je sauvegarde le token dans le local storage
        sessionStorage.setItem("token", data.token);
        // Je renvoie sur la page d'accueille
        window.location.href = "./index.html";
      }
      // Je vide le formulaire
      form.reset();
    });
});
