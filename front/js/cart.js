
let ajoutProduit = JSON.parse(localStorage.getItem("produit"));

let someProduit = [];
let sommeProduits;
let commandeProduits = JSON.parse(localStorage.getItem("commandes"));

let section = document.getElementById("cart__items");
let quantiteTotal = document.getElementById("totalQuantity");
let prixTotal = document.getElementById("totalPrice");

let afficheQuantites = document.querySelectorAll(".itemQuantity");



/////////////  INTRODUCTION DES CARTES DANS LE PANIER  ////////////// 

const panierDisplay = async () => {
    if (ajoutProduit) {
        await ajoutProduit;
        section.innerHTML = ajoutProduit.map((produit) => `
        <article class="cart__item" data-id="${produit._id}" data-colors="${produit.colors}">
              <div class="cart__item__img">
                <img src="${produit.imageUrl}" alt="${produit.altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${produit.name}</h2>
                  <p>${produit.colors}</p>
                  <p>${(produit.price) * (produit.quantite)} €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantite}" data-id="${produit._id}" data-colors="${produit.colors}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${produit._id}" data-colors="${produit.colors}">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>
        `,
        )
            .join("");
        calculProduit();
        supprimeProduit();
        modificationQuantite();

    } else {
        console.log("erreur");
    }
};
panierDisplay();


///////////  FONCTION DE MODIFICATION DES QUANTITE  ///////////

const modificationQuantite = async (panierDisplay) => {
    await panierDisplay;
    let afficheQuantites = document.querySelectorAll(".itemQuantity");
    afficheQuantites.forEach((positive) => {
        positive.addEventListener("click", () => {
            for (i = 0; i < ajoutProduit.length; i++) {
                if (
                    ajoutProduit[i]._id == positive.dataset.id &&
                    ajoutProduit[i].colors == positive.dataset.colors
                ) {
                    return (
                        ajoutProduit[i].quantite = Number(positive.value),
                        localStorage.setItem("produit", JSON.stringify(ajoutProduit)),
                        location.reload()
                    );
                }
            }
        });
    });
};


/////////////  SUPPRESSION DES PRODUITS DANS LE PANIER  ////////////////

const supprimeProduit = async (panierDisplay) => {
    await panierDisplay;
    let corbeilles = document.querySelectorAll(".deleteItem");
    corbeilles.forEach((corbeille) => {
        corbeille.addEventListener("click", () => {

            let totalajoutProduitRemove = ajoutProduit.length;
            if (totalajoutProduitRemove == 1) {
                return (
                    localStorage.removeItem("produit"),
                    (location.href = "cart.html")
                );
            } else {
                someProduit = ajoutProduit.filter((el) => {
                    if (
                        corbeille.dataset.id != el._id ||
                        corbeille.dataset.colors != el.colors
                    ) {
                        return true;
                    }
                });
                localStorage.setItem("produit", JSON.stringify(someProduit));
                location.href = "cart.html";
            }
        });
    });
    return;
};


/////////////  CALCUL DU PRODUIT TOTAL  ////////////////

const calculProduit = async (
    panierDisplay,
    modificationQuantite,
    // plusQuantite,
    supprimeProduit,
) => {
    await panierDisplay;
    await modificationQuantite;
    // await plusQuantite;
    await supprimeProduit;

    let produitPrice = [];
    let quantiteTotalProduit = [];
    let newTableau = JSON.parse(localStorage.getItem("produit"));
    let afficheQuantites = document.querySelectorAll(".itemQuantity");

    newTableau.forEach((product) => {
        produitPrice.push(
            product.price.toString() * product.quantite,
        );
        quantiteTotalProduit.push(product.quantite);
    });

    quantiteTotal.textContent = `${eval(quantiteTotalProduit.join("+"))}`;
    sommeProduits = eval(produitPrice.toString().replace(/,/g, "+"));
    prixTotal.textContent = sommeProduits;
};


////////////////////////  AFFICHAGE DES QUANTITE ET DES PRIX ////////////////////////

let produitLocal = JSON.parse(localStorage.getItem("produit"));
let meubleQuantiteTotal = [];
let meublePrixTotal = [];

if (produitLocal) {
    produitLocal.forEach((meuble) => {
        meubleQuantiteTotal.push(meuble.quantite);
        meublePrixTotal.push(meuble.price);
    });
    quantiteTotal.textContent = `${eval(meubleQuantiteTotal.join("+"))}`;
    prixTotal.textContent = `${eval(meublePrixTotal.join("+"))}`;
}





/////////////////////////////////////       FORMULAIRE DE CONTACT      ////////////////////////////////////



const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");
const formulaire = document.querySelector(".cart__order__form");
const btn = document.getElementById("order");
const erreurMessagePrenom = document.getElementById("firstNameErrorMsg");
const erreurMessageNom = document.getElementById("lastNameErrorMsg");
const erreurMessageAdresse = document.getElementById("addressErrorMsg");
const erreurMessageVille = document.getElementById("cityErrorMsg");
const erreurMessageEmail = document.getElementById("emailErrorMsg");


let valuePrenom, valueNom, valueAdresse, valueVille, valueEmail;

///////////////  VERRIFICATION DU CHAMP PRENOM DU FORMULAIRE  ///////////////////////

prenom.addEventListener("input", (e) => {
    valuePrenom;
    if (e.target.value.length == 0) {
        erreurMessagePrenom.innerHTML = "";
        valuePrenom = null;
    }
    else if (e.target.value.length < 1 || e.target.value.length > 25) {
        erreurMessagePrenom.innerHTML = "Prenom doit contenir entre 1 et 25 caractéres";
        valuePrenom = null;
    }
    if (e.target.value.match(/^[a-z A-Z À-ÿ \-]{1,25}$/)) {
        erreurMessagePrenom.innerHTML = "";
        valuePrenom = e.target.value;
    }
    if (!e.target.value.match(/^[a-z A-Z À-ÿ \-]{1,25}$/) && e.target.value.length > 1 && e.target.value.length < 25) {
        erreurMessagePrenom.innerHTML = "Prenom ne contien pas de caractéres spécial hors mis les accents et les tirets";
        valuePrenom = null;
    }
});


///////////////  VERRIFICATION DU CHAMP NOM DU FORMULAIRE  ///////////////////////

nom.addEventListener("input", (e) => {
    valueNom;
    if (e.target.value.length == 0) {
        erreurMessageNom.innerHTML = "";
        valueNom = null;
    }
    else if (e.target.value.length < 1 || e.target.value.length > 25) {
        erreurMessageNom.innerHTML = "Nom doit contenir entre 1 et 25 caractéres";
        valueNom = null;
    }
    if (e.target.value.match(/^[a-z A-Z À-ÿ]{1,25}$/)) {
        erreurMessageNom.innerHTML = "";
        valueNom = e.target.value;
    }
    if (!e.target.value.match(/^[a-z A-Z À-ÿ]{1,25}$/) && e.target.value.length > 1 && e.target.value.length < 25) {
        erreurMessageNom.innerHTML = "Nom ne contien pas de caractéres spécial hors mis les accents et les tirets";
        valueNom = null;
    }
});


///////////////  VERRIFICATION DU CHAMP ADRESSE DU FORMULAIRE  ///////////////////////

adresse.addEventListener("input", (e) => {
    valueAdresse;
    if (e.target.value.length == 0) {
        erreurMessageAdresse.innerHTML = "";
        valueAdresse = null;
    }
    else if (e.target.value.length < 1 || e.target.value.length > 25) {
        erreurMessageAdresse.innerHTML = "Adresse doit contenir entre 1 et 25 caractéres";
        valueAdresse = null;
    }
    if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z À-ÿ]{1,25}$/)) {
        erreurMessageAdresse.innerHTML = "";
        valueAdresse = e.target.value;
    }
    if (!e.target.value.match(/^[0-9]{1,3} [a-z A-Z À-ÿ]{1,25}$/) && e.target.value.length > 1 && e.target.value.length < 25) {
        erreurMessageAdresse.innerHTML = "Adresse commence par des chiffre et des lettres, et sans de caractéres spécial hors mis les accents et les tirets";
        valueAdresse = null;
    }
});


///////////////  VERRIFICATION DU CHAMP VILLE DU FORMULAIRE  ///////////////////////

ville.addEventListener("input", (e) => {
    valueVille;
    if (e.target.value.length == 0) {
        erreurMessageVille.innerHTML = "";
        valueVille = null;
    }
    else if (e.target.value.length < 1 || e.target.value.length > 25) {
        erreurMessageVille.innerHTML = "Ville doit contenir entre 1 et 25 caractéres";
        valueVille = null;
    }
    if (e.target.value.match(/^[a-z A-Z À-ÿ]{1,25}$/)) {
        erreurMessageVille.innerHTML = "";
        valueVille = e.target.value;
    }
    if (!e.target.value.match(/^[a-z A-Z À-ÿ]{1,25}$/) && e.target.value.length > 1 && e.target.value.length < 25) {
        erreurMessageVille.innerHTML = "Ville ne contien pas de caractéres spécial hors mis les accents et les tirets";
        valueVille = null;
    }
});


///////////////  VERRIFICATION DU CHAMP EMAIL DU FORMULAIRE  ///////////////////////

email.addEventListener("input", (e) => {
    if (e.target.value.length == 0) {
        erreurMessageEmail.innerHTML = "";
        valueEmail = null;
    } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        erreurMessageEmail.innerHTML = "";
        valueEmail = e.target.value;
    }
    if (!e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && !e.target.value.length == 0) {
        erreurMessageEmail.innerHTML = "Email incorrect ex: OpenClassrooms@gmail.com";
        valueEmail = null;
    }
});





////////////////////  PASSER LA COMMANDE  ////////////////////// 

formulaire.addEventListener("submit", (e) => {
    e.preventDefault();

    if (valuePrenom && valueNom && valueAdresse && valueVille && valueEmail) {
        const commandeFinal = JSON.parse(localStorage.getItem("produit"));

        let commandeId = [];
        commandeFinal.forEach((commande) => {
            commandeId.push(commande._id);
        });
        console.log("commande id", commandeId);
        console.log("Les produits", commandeFinal);


        let commandeQuantite = [];
        commandeFinal.forEach((commande) => {
            commandeQuantite.push(commande.quantite);
        });
        console.log("commande quantite", commandeQuantite);



        let commandeColors = [];
        commandeFinal.forEach((commande) => {
            commandeColors.push(commande.colors);
        });

        const data = {
            contact: {
                firstName: valuePrenom,
                lastName: valueNom,
                address: valueAdresse,
                city: valueVille,
                email: valueEmail
            },
            products: commandeId,
        };

        console.log("data :", data);

        fetch('http://localhost:3000/api/products/order', {
            method: "post",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((promise) => {
                reponseServeur = promise;

                console.log("serveur", reponseServeur);
                console.log("reponse serveur", reponseServeur.products);

                const dataCommande = {
                    contact: reponseServeur.contact,
                    order: reponseServeur.orderId,
                    articles: {
                        id: commandeId,
                        quantite: commandeQuantite,
                        couleurs: commandeColors
                    }
                };

                if (commandeProduits == null) {
                    commandeProduits = [];
                    commandeProduits.push(dataCommande);
                    localStorage.setItem("commandes", JSON.stringify(commandeProduits));
                } else if (commandeProduits != null) {
                    commandeProduits.push(dataCommande);
                    localStorage.setItem("commandes", JSON.stringify(commandeProduits));
                }
                localStorage.removeItem("produit");
                location.href = "confirmation.html";
            });
        prenom.value = "";
        nom.value = "";
        email.value = "";
        ville.value = "";
        adresse.value = "";
        valueAdresse = null;
        valueEmail = null;
        valuePrenom = null;
        valueNom = null;
        valueVille = null;

    } else {
        alert("remplir le formulaire correctement");
    }
});
