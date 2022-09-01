// localStorage.setItem("cle","valeur")
// localStorage.getItem("cle")
// localStorage.clear();

// JSON.stringify(objet)
// JSON.parse(string);
let addProduit = JSON.parse(localStorage.getItem("produit"));

let someProduct = [];
let sommeProduits;
let commandeProducts = JSON.parse(localStorage.getItem("commandes"));


let section = document.getElementById("cart__items");
let quantiteTotal = document.getElementById("totalQuantity");
let prixTotal = document.getElementById("totalPrice");

let afficheQuantites = document.querySelectorAll(".itemQuantity");



const panierDisplay = async () => {
  if (addProduit) {
    await addProduit;
    section.innerHTML = addProduit.map((produit) => `
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
    removeProduct();
    // plusQuantite();
    // minQuantite();
    // hello();

    changeQuantity();

  } else {
    // formulaireContact.classList.add("display-none");
    // continueCommande.addEventListener("click", () => {
    //     location.href = "panier.html";
    //     alert("Ajoutez des produits au panier pour continuer");
    // });
    // spanQuantite.classList.remove("flex-centre");
    // spanQuantite.classList.add("display-none");
  }
};
panierDisplay();





///////////  FONCTION D'AUGMENTATION ET DE DIMUNITION DES QUANTITE  ///////////

// const plusQuantite = async (panierDisplay) => {
//   await panierDisplay;
//   // console.log("fonction plus");
//   let afficheQuantites = document.querySelectorAll(".itemQuantity");
//   // let afficheQuantites = document.getElementsByClassName("itemQuantity");
//   afficheQuantites.forEach((positive) => {
//     positive.addEventListener("click", () => {
//       // console.log(positive);
//       for (i = 0; i < addProduit.length; i++) {
//         if (
//           addProduit[i]._id == positive.dataset.id &&
//           addProduit[i].colors == positive.dataset.colors
//           // && positive.value > afficheQuantites.value
//         );
//         {
//           return (
//             addProduit[i].quantite++,
//             localStorage.setItem("produit", JSON.stringify(addProduit)),
//             (afficheQuantites.textContent = addProduit[i].quantite),
//             // calculProduit(),
//             console.log("quantite++")
//           );
//         }
//       }
//     });
//   });
// };






// let quantiteTotal = document.getElementById("totalQuantity");
// let prixTotal = document.getElementById("totalPrice");






// const plusQuantite = async (panierDisplay) => {
//   await panierDisplay;
//   // console.log("fonction plus");
//   let afficheQuantites = document.querySelectorAll(".itemQuantity");
//   // let afficheQuantites = document.getElementsByClassName("itemQuantity");
//   afficheQuantites.forEach((positive) => {
//     positive.addEventListener("click", () => {
//       // console.log(positive);
//       for (i = 0; i < addProduit.length; i++) {
//         if (
//           addProduit[i]._id == positive.dataset.id &&
//           addProduit[i].colors == positive.dataset.colors
//           // && positive.value > afficheQuantites.value
//         );
//         {
//           return (
//             addProduit[i].quantite++,
//             localStorage.setItem("produit", JSON.stringify(addProduit)),
//             (afficheQuantites.textContent = addProduit[i].quantite),
//             // calculProduit(),
//             console.log("quantite++")
//           );
//         }
//       }
//     });
//   });
// };















////////  FONCTION DE DIMINUTION DE QUANTITE  ////////////

// const minQuantite = async (panierDisplay) => {
//   await panierDisplay;
//   let moins = document.querySelectorAll(".bouton-moins");
//   console.log(moins);
//   moins.forEach((negative) => {
//     negative.addEventListener("click", () => {
//       console.log(negative);

//       let totalAddProduit = addProduit.length;

//       for (i = 0; i < totalAddProduit; i++) {
//         console.log(totalAddProduit);
//         if (addProduit[i].quantite == 1 && totalAddProduit == 1) {
//           return (
//             localStorage.removeItem("produit"),
//             (location.href = "panier.html"),
//             console.log("remove tout le panier")
//           );
//         }
//         if (
//           addProduit[i].quantite == 1 &&
//           totalAddProduit != 1 &&
//           addProduit[i]._id == negative.dataset.id &&
//           addProduit[i].teinte == negative.dataset.teinte
//         ) {
//           addProduit.splice(i, 1);
//           localStorage.setItem("produit", JSON.stringify(addProduit));
//           location.href = "panier.html";
//           console.log("remove le produit en question");
//         }
//         if (
//           (addProduit[i].quantite != 1 &&
//             totalAddProduit != 1 &&
//             addProduit[i]._id == negative.dataset.id &&
//             addProduit[i].teinte == negative.dataset.teinte) ||
//           (addProduit[i].quantite != 1 &&
//             totalAddProduit == 1 &&
//             addProduit[i]._id == negative.dataset.id &&
//             addProduit[i].teinte == negative.dataset.teinte)
//         ) {
//           return (
//             addProduit[i].quantite--,
//             localStorage.setItem(
//               "produit",
//               JSON.stringify(addProduit),
//               (document.querySelectorAll(".produit-quantite")[i].textContent =
//                 addProduit[i].quantite),
//               (document.querySelectorAll(".prix-total-quantite")[
//                 i
//               ].textContent = `
//             ${
//               addProduit[i].quantite *
//               addProduit[i].price.toString().replace(/00/, "")
//             } E`),
//               calculProduit(),
//               console.log("quantite--"),
//             )
//           );
//         }
//       }
//     });
//   });
// };















// let addProduit = JSON.parse(localStorage.getItem("produit"));

//////////////  ESSAI DE CODE  ///////////////// 

const changeQuantity = async (panierDisplay) => {
  // async function changeQuantity() {

  await panierDisplay;

  console.log("un");

  // const quantityInputs = document.querySelectorAll(".itemQuantity");
  let afficheQuantites = document.querySelectorAll(".itemQuantity");
  afficheQuantites.forEach((quantityInput) => {
    console.log("deux");

    quantityInput.addEventListener("change", (event) => {
      console.log("trois");

      event.preventDefault();
      console.log("quatre");

      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      // let cart = localStorage.getItem("produit");
      // let items = JSON.parse(cart);

      let addProduit = JSON.parse(localStorage.getItem("produit"));


      // addProduit = addProduit.map((item, index) => {
      addProduit = addProduit.map((item) => {
        if (addProduit[item]._id == quantityInput.dataset.id &&
          addProduit[item].colors == quantityInput.dataset.colors) {

          // if (item.id === dataId && item.color === dataColor) {

          item.quantity = inputValue;
        }
        return item;
      });
      console.log("cinqu");


      // items = items.map((item, index) => {
      //   if (item.id === dataId && item.color === dataColor) {
      //     item.quantity = inputValue;
      //   }
      //   return item;
      // });

      // Mise à jour du localStorage

      localStorage.setItem("produit", JSON.stringify(addProduit)),
        afficheQuantites.textContent = addProduit[item].quantite,

        // let itemsStr = JSON.stringify(items);
        // localStorage.setItem("cart", itemsStr);

        // Refresh de la page Panier
        location.reload();
    });
  });
}
console.log("final !");

































////////////////////////  AFFICHAGE DES QUANTITE ET DES PRIX ////////////////////////


let produitLocal = JSON.parse(localStorage.getItem("produit"));

// let quantiteTotal = document.getElementById("totalQuantity");
// let prixTotal = document.getElementById("totalPrice");

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



















////////////////////////  FORMULAIRE DE CONTACT ////////////////////////


const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");

// const formulaire = document.getElementsByClassName("cart__order__form");
const formulaire = document.querySelector(".cart__order__form");
const btn = document.getElementById("order");

const errorMessagePrenom = document.getElementById("firstNameErrorMsg");
const errorMessageNom = document.getElementById("lastNameErrorMsg");
const errorMessageAdresse = document.getElementById("addressErrorMsg");
const errorMessageVille = document.getElementById("cityErrorMsg");
const errorMessageEmail = document.getElementById("emailErrorMsg");



let valuePrenom, valueNom, valueAdresse, valueVille, valueEmail;
prenom.addEventListener("input", (e) => {
  valuePrenom;
  if (e.target.value.length == 0) {
    errorMessagePrenom.innerHTML = "";
    valuePrenom = null;
  }
  else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorMessagePrenom.innerHTML = "Prenom doit contenir entre 3 et 25 caractéres";
    valuePrenom = null;
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    errorMessagePrenom.innerHTML = "";
    valuePrenom = e.target.value;
  }
  if (!e.target.value.match(/^[a-z A-Z]{3,25}$/) && e.target.value.length > 3 && e.target.value.length < 25) {
    errorMessagePrenom.innerHTML = "Prenom ne contien pas de caractéres spécial";
    valuePrenom = null;
  }
});




nom.addEventListener("input", (e) => {
  valueNom;
  if (e.target.value.length == 0) {
    errorMessageNom.innerHTML = "";
    valueNom = null;
  }
  else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorMessageNom.innerHTML = "Nom doit contenir entre 3 et 25 caractéres";
    valueNom = null;
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    errorMessageNom.innerHTML = "";
    valueNom = e.target.value;
  }
  if (!e.target.value.match(/^[a-z A-Z]{3,25}$/) && e.target.value.length > 3 && e.target.value.length < 25) {
    errorMessageNom.innerHTML = "Nom ne contien pas de caractéres spécial";
    valueNom = null;
  }
});




adresse.addEventListener("input", (e) => {
  valueAdresse;
  if (e.target.value.length == 0) {
    errorMessageAdresse.innerHTML = "";
    valueAdresse = null;
  }
  else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorMessageAdresse.innerHTML = "Adresse doit contenir entre 3 et 25 caractéres";
    valueAdresse = null;
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/)) {
    errorMessageAdresse.innerHTML = "";
    valueAdresse = e.target.value;
  }
  if (!e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/) && e.target.value.length > 3 && e.target.value.length < 25) {
    errorMessageAdresse.innerHTML = "Adresse commence par des chiffre et des lettres, et sans de caractéres spécial";
    valueAdresse = null;
  }
});



ville.addEventListener("input", (e) => {
  valueVille;
  if (e.target.value.length == 0) {
    errorMessageVille.innerHTML = "";
    valueVille = null;
  }
  else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorMessageVille.innerHTML = "Ville doit contenir entre 3 et 25 caractéres";
    valueVille = null;
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    errorMessageVille.innerHTML = "";
    valueVille = e.target.value;
  }
  if (!e.target.value.match(/^[a-z A-Z]{3,25}$/) && e.target.value.length > 3 && e.target.value.length < 25) {
    errorMessageVille.innerHTML = "Ville ne contien pas de caractéres spécial";
    valueVille = null;
  }
});




email.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    errorMessageEmail.innerHTML = "";
    valueEmail = null;
  } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errorMessageEmail.innerHTML = "";
    valueEmail = e.target.value;
  }
  if (!e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && !e.target.value.length == 0) {
    errorMessageEmail.innerHTML = "Email incorrect ex: OpenClassrooms@gmail.com";
    valueEmail = null;
  }
});








/////////////  SUPPRESSION DES PRODUITS DANS LE PANIER  ////////////////

const removeProduct = async (panierDisplay) => {
  await panierDisplay;
  let corbeilles = document.querySelectorAll(".deleteItem");
  corbeilles.forEach((corbeille) => {
    corbeille.addEventListener("click", () => {
      console.log(corbeille);

      let totalAddProduitRemove = addProduit.length;
      // console.log("total add produit remove :", totalAddProduitRemove);
      if (totalAddProduitRemove == 1) {
        return (
          localStorage.removeItem("produit"),
          (location.href = "cart.html")
        );
      } else {
        someProduct = addProduit.filter((el) => {
          if (
            corbeille.dataset.id != el._id ||
            corbeille.dataset.colors != el.colors
          ) {
            return true;
          }
        });
        localStorage.setItem("produit", JSON.stringify(someProduct));
        // calculProduit();
        location.href = "cart.html";
      }
    });
  });
  return;
};




















const calculProduit = async (
  panierDisplay,
  minQuantite,
  plusQuantite,
  removeProduct,
) => {
  await panierDisplay;
  await minQuantite;
  await plusQuantite;
  await removeProduct;
  // console.log("je calcule les produits");

  let produitPrice = [];
  let quantiteTotalProduit = [];
  let newTableau = JSON.parse(localStorage.getItem("produit"));
  // console.log(newTableau);
  let afficheQuantites = document.querySelectorAll(".itemQuantity");
  // console.log(afficheQuantite);

  newTableau.forEach((product) => {
    produitPrice.push(
      product.price.toString() * product.quantite,
    );
    quantiteTotalProduit.push(product.quantite);
  });
  // console.log(produitPrice);
  // console.log(quantiteTotalProduit);

  quantiteTotal.textContent = `${eval(quantiteTotalProduit.join("+"))}`;
  sommeProduits = eval(produitPrice.toString().replace(/,/g, "+"));
  // console.log(sommeProduits);
  prixTotal.textContent = sommeProduits;
};















formulaire.addEventListener("submit", (e) => {
  e.preventDefault();

  if (valuePrenom && valueNom && valueAdresse && valueVille && valueEmail) {
    const commandeFinal = JSON.parse(localStorage.getItem("produit"));
    let commandeId = [];
    // console.log(commandeFinal);
    commandeFinal.forEach((commande) => {
      commandeId.push(commande._id);
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
    console.log("data : _2", data);

    ///////////// fesh get ////////////
    fetch('http://localhost:3000/api/products/order', {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((promise) => {
        reponseServeur = promise;

        const dataCommande = {
          contact: reponseServeur.contact,
          order: reponseServeur.orderId,
          articles: reponseServeur.products,
          Total: sommeProduits,
        };

        // console.log("data commande : _4", dataCommande);
        if (commandeProducts == null) {
          commandeProducts = [];
          commandeProducts.push(dataCommande);
          localStorage.setItem("commandes", JSON.stringify(commandeProducts));
        } else if (commandeProducts != null) {
          commandeProducts.push(dataCommande);
          localStorage.setItem("commandes", JSON.stringify(commandeProducts));
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
// console.log("commande Products :", commandeProducts);










// let afficheQuantite = document.querySelectorAll(".itemQuantity");
// let afficheQuantite = document.getElementsByClassName('itemQuantity');



// const hello = afficheQuantite.addEventListener("change", () => {
//   console.log("oui !");
//   quantiteTotal.textContent = this.value;
// });


// afficheQuantite.addEventListener('change', function () {
//   await(panierDisplay)
//   quantiteTotal.textContent = this.value;
// });





// const hello = async () => {
//   await panierDisplay;
//   console.log("un");
//   // let afficheQuantites = document.querySelectorAll(".itemQuantity");
//   afficheQuantites.forEach((nombre) => {
//     console.log("deux");
//     nombre.addEventListener("click", () => {
//       console.log(nombre);
//       console.log("oui !!");

//       quantiteTotal.textContent = this.value;


//     });
//   });
//   return;
// };
// console.log("trois");