
const product = window.location.search.split("?").join("");
let produitsData = [];
let affichageQuantite = document.getElementById("totalQuantity");


//////////////  FETCH A L'API  //////////////

const fetchproduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
        .then((res) => res.json())
        .then((promise) => {
            produitsData = promise;
            // console.log(produitsData);
        })
        .catch((error) => {
            alert(error)
        })
};


///////////////   INTRODUCTION DYNAMIQUE DE LA CART SELECTIONNE SUR L'INDEX  ////////////////////

const produitDisplay = async () => {
    await fetchproduct();

    document.querySelector('.item__img').innerHTML = `<img src="${produitsData.imageUrl}" alt="${produitsData.altTxt}">`
    document.getElementById('title').innerText = `${produitsData.name}`
    document.getElementById('price').innerText = `${produitsData.price}`
    document.getElementById('description').innerText = `${produitsData.description}`;

    let select = document.getElementById('colors');
    produitsData.colors.forEach((e) => {
        let option = document.createElement('option');
        option.innerHTML = `${e}`;
        option.value = `${e}`;
        select.appendChild(option);
    });
    ajoutCanape(produitsData);

}
produitDisplay();


////////////  AJOUT DU PRODUIT DANS LE LOCALSTORAGE ET RECUPERATION DANS LE PANIER  ///////////

const ajoutCanape = () => {
    let bouton = document.getElementById('addToCart');
    bouton.addEventListener("click", () => {
        let produitTableau = JSON.parse(localStorage.getItem("produit"));
        let select = document.getElementById("colors");
        let nombreArticles = document.getElementById("quantity");

        // console.log("produitTableau", produitTableau);


        if (select.value && nombreArticles.value && (nombreArticles.value > 0 && nombreArticles.value <= 100)) {

            const fusionProduitCouleurs = Object.assign({}, produitsData, {
                colors: `${select.value}`,
                quantite: Number(nombreArticles.value),
            });

            if (produitTableau == null) {
                produitTableau = [];
                meubleQuantiteTotal = [];
                produitTableau.push(fusionProduitCouleurs);
                localStorage.setItem("produit", JSON.stringify(produitTableau));
                (alert("Ajout de   " + Number(nombreArticles.value) + " canapés     " + `${produitsData.name}` + "    de couleur    " + select.value + "    au panier."))
            } else if (produitTableau != null) {
                meubleQuantiteTotal = [];

                for (i = 0; i < produitTableau.length; i++) {
                    if (
                        (produitTableau[i]._id == produitsData._id &&
                            produitTableau[i].colors == select.value)
                    ) {
                        return (
                            produitTableau[i].quantite += Number(nombreArticles.value),
                            localStorage.setItem("produit", JSON.stringify(produitTableau)),
                            (produitTableau = JSON.parse(localStorage.getItem("produit"))),
                            (alert("Ajout de   " + Number(nombreArticles.value) + " canapés     " + produitTableau[i].name + "    de couleur    " + select.value + "    au panier."))
                        );
                    }
                }
                for (i = 0; i < produitTableau.length; i++) {
                    if (
                        (produitTableau[i]._id == produitsData._id &&
                            produitTableau[i].colors != select.value) ||
                        produitTableau[i]._id != produitsData._id
                    ) {
                        return (
                            produitTableau.push(fusionProduitCouleurs),
                            localStorage.setItem("produit", JSON.stringify(produitTableau)),
                            (produitTableau = JSON.parse(localStorage.getItem("produit"))),
                            (alert("Ajout de   " + Number(nombreArticles.value) + " canapés     " + produitTableau[i].name + "    de couleur    " + select.value + "    au panier."))
                        );
                    }
                }
            }
        } else {
            alert("N'oubliez pas de chosir une couleur et une quantité (entre 1 et 100 max)")
        }
    });
    return (
        (produitTableau = JSON.parse(localStorage.getItem("produit")))
    );
};

