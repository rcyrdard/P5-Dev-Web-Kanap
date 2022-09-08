
const product = window.location.search.split("?").join("");
let productsData = [];
let affichageQuantite = document.getElementById("totalQuantity");

let textOption = "--SVP, choisissez une couleur --";

//////////////  FETCH A L'API  //////////////

const fetchproduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
        .then((res) => res.json())
        .then((promise) => {
            productsData = promise;
        })
        .catch((error) => {
            alert(error)
        })
};


///////////////   INTRODUCTION DYNAMIQUE DE LA CART SELECTIONNE SUR L'INDEX  ////////////////////

const produitDisplay = async () => {
    await fetchproduct();

    document.querySelector('.item__img').innerHTML = `<img src="${productsData.imageUrl}" alt="${productsData.altTxt}">`
    document.getElementById('title').innerText = `${productsData.name}`
    document.getElementById('price').innerText = `${productsData.price}`
    document.getElementById('description').innerText = `${productsData.description}`;

    let select = document.getElementById('colors');
    productsData.colors.forEach((e) => {
        let option = document.createElement('option');
        option.innerHTML = `${e}`;
        option.value = `${e}`;
        select.appendChild(option);
    });
    addCanape(productsData);
}
produitDisplay();


////////////  AJOUT DU PRODUIT DANS LE LOCALSTORAGE ET RECUPERATION DANS LE PANIER  ///////////

const addCanape = () => {
    let bouton = document.getElementById('addToCart');
    bouton.addEventListener("click", () => {


        let produitTableau = JSON.parse(localStorage.getItem("produit"));
        let select = document.getElementById("colors");
        let titre = document.getElementById('title')

        let nombreArticles = document.getElementById("quantity");
        let prixArticle = document.getElementById("price");

        let inputs = document.getElementsByTagName("option");


        if (select.value && nombreArticles.value && (nombreArticles.value > 0 && nombreArticles.value <= 100)) {


            const fusionProduitColors = Object.assign({}, productsData, {
                colors: `${select.value}`,
                // quantite: 1,
                quantite: Number(nombreArticles.value),

            });

            if (produitTableau == null) {
                produitTableau = [];
                meubleQuantiteTotal = [];
                // alert(`Vous venez de placer ${produitTableau[i].quantite} articles ${produitTableau[i].name} de couleurs ${produitTableau[i].colors} dans le panier`);
                produitTableau.push(fusionProduitColors);
                localStorage.setItem("produit", JSON.stringify(produitTableau));
                // alert(`Vous venez de placer ${nombreArticles.value} articles ${productsData.name} de couleurs ${select.value} dans le panier`);
                // alert(`Vous venez de placer ${produitTableau[i].quantite} articles ${produitTableau[i].name} de couleurs ${produitTableau[i].colors} dans le panier`)

            } else if (produitTableau != null) {
                meubleQuantiteTotal = [];

                console.log("j'y suis !");
                for (i = 0; i < produitTableau.length; i++) {
                    console.log(produitTableau[i], select.value, productsData._id);
                    if (
                        produitTableau[i]._id == productsData._id &&
                        produitTableau[i].colors == select.value
                    ) {

                        // alert(`Vous venez de placer ${produitTableau[i].quantite} articles ${produitTableau[i].name} de couleurs ${produitTableau[i].colors} dans le panier`),
                        produitTableau[i].quantite += Number(nombreArticles.value)
                        console.log("quantite++")
                        console.log(produitTableau[i]);
                        localStorage.setItem("produit", JSON.stringify(produitTableau))
                        // (produitTableau = JSON.parse(localStorage.getItem("produit")))


                        break
                    } else {

                        // alert(`Vous venez de placer ${produitTableau[i].quantite} articles ${produitTableau[i].name} de couleurs ${produitTableau[i].colors} dans le panier`),
                        produitTableau.push(fusionProduitColors)
                        localStorage.setItem("produit", JSON.stringify(produitTableau))
                        // (produitTableau = JSON.parse(localStorage.getItem("produit")))
                        break

                    }
                }
                // alert(`Vous venez de placer ${produitTableau[i].quantite} articles ${produitTableau[i].name} de couleurs ${produitTableau[i].colors} dans le panier`)

                // for (i = 0; i < produitTableau.length; i++) {
                //     if (
                //         (produitTableau[i]._id == productsData._id &&
                //             produitTableau[i].colors != select.value) ||
                //         produitTableau[i]._id != productsData._id
                //     ) {
                //         return (
                //             // alert(`Vous venez de placer ${produitTableau[i].quantite} articles ${produitTableau[i].name} de couleurs ${produitTableau[i].colors} dans le panier`),
                //             produitTableau.push(fusionProduitColors),
                //             localStorage.setItem("produit", JSON.stringify(produitTableau)),
                //             (produitTableau = JSON.parse(localStorage.getItem("produit")))

                //         );

                //     }
                // }
                // alert(`Vous venez de placer ${produitTableau[i].quantite} articles ${produitTableau[i].name} de couleurs ${produitTableau[i].colors} dans le panier`)

            }
            // alert(`Vous venez de placer ${nombreArticles.value} articles ${titre.value} de couleurs ${select.value} dans le panier`)

        } else {
            alert("N'oubliez pas de chosir une couleur et une quantité (entre 1 et 100 max)")
        }
        // alert(`Vous venez de placer ${nombreArticles.value} articles ${titre.value} de couleurs ${select.value} dans le panier`)

    });
    // alert(`Vous venez de placer ${nombreArticles.value} articles ${titre.value} de couleurs ${select.value} dans le panier`)

    return (
        // alert(`Vous venez de placer ${produitTableau[i].quantite} articles ${produitTableau[i].name} de couleurs ${produitTableau[i].colors} dans le panier`)
        (produitTableau = JSON.parse(localStorage.getItem("produit")))

    );
};