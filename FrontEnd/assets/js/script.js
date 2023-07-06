const gallery = document.querySelector(".gallery"); // Je selectionne la balise gallery
const filter = document.querySelector(".filter");
const token = localStorage.getItem("token"); // Je recupere le token dans le local storage
//let works = [];

// Je recupere les donnees de l'API et je les place dans un array
const fetchWorks = () => {
  fetch("http://localhost:5678/api/works")
    .then((repsonse) => repsonse.json())
    .then((data) => {
      works = data;
      createGallery(works);
    });
};
fetchWorks();

// J'efface tout dans la gallery et je le remplace dynamiquement tout les travaux
function createGallery(objet) {
  let galleries = "";
  for (let work of objet) {
    galleries += `
    <figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    </figure>
    `;
  }
  gallery.innerHTML = galleries;
}

////////////////// TOUT POUR LES BOUTONS FILTRES //////////////////
// Je cree les boutons pour les filtres
const filterBtns = () => {
  filter.innerHTML = `
    <button class="btn-tous">Tous</button>
    <button class="btn-objets">Objets</button>
    <button class="btn-appartements">Appartements</button>
    <button class="btn-hotel">Hôtels & restaurants</button>
    `;
};
filterBtns();

// J'ecoutes au click de la souris pour filtrer par categorie
document.querySelector(".btn-tous").addEventListener("click", (e) => {
  createGallery(works);
});

document.querySelector(".btn-objets").addEventListener("click", (e) => {
  const objets = works.filter((e) => {
    return e.category.id === 1;
  });
  createGallery(objets);
});

document.querySelector(".btn-appartements").addEventListener("click", (e) => {
  const objetId = works.filter((event) => {
    return event.category.id === 2;
  });
  createGallery(objetId);
});

document.querySelector(".btn-hotel").addEventListener("click", (e) => {
  const objetId = works.filter((event) => {
    return event.category.id === 3;
  });
  createGallery(objetId);
});

// Je change le style du bouton quand il est active
const filterBtnsStyle = () => {
  let filterBtn = null;
  filter.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      e.target.classList.add("btnFilled");
      if (filterBtn !== null) {
        filterBtn.classList.remove("btnFilled");
      }
      filterBtn = e.target;
    }
  });
};
filterBtnsStyle();

////////////////// TOUT POUR LE LOGIN ET AFFICHAGE DES ELEMENTS MODIFIER //////////////////
// Je check si le token est dans le localstorage si oui je montre le banner et les boutons modifier
// sinon je montre les boutons pour filtrer les travaux
const banner = document.querySelector(".banner");
const logoutElement = document.getElementById("logout");
const linkModalIntro = document.querySelector(".link-modal-intro");
const linkModal = document.querySelector(".link-modal");

const userLoginCheck = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token != null) {
      filter.style.display = "none";
      banner.style.display = "flex";
      logoutElement.textContent = "logout";
      linkModalIntro.style.display = "inline";
      linkModal.style.display = "inline";
    } else {
      //filterBtns();
    }
  });
};
userLoginCheck();

logoutElement.addEventListener("click", () => {
  localStorage.clear("token");
  window.location.href = "./index.html";
});
////////////////// TOUT POUR QUAND EN EST LOGGED-IN //////////////////

// Je change le nom login vers logout en mode edition

/* document.querySelector("#linkModal").addEventListener("click", openModal);
document
  .querySelector("#modal-close-btn")
  .addEventListener("click", closeModal);
 */
