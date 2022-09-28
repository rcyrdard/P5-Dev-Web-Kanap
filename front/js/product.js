
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








        // let rechercheId = [];
        // produitTableau.forEach((element) => {
        //     // rechercheId.push(element._id, element.quantite);
        //     if (element_id) {
        //         let quantiteElement = eval(element.quantite);
        //         console.log("quantite des id:", element.quantiteElement);
        //     }
        // });
        // console.log("recherche quantite", rechercheId);








        ////////////////////  TABLE MULTIPLICATION  ///////////////////

        // for(let j=1; j<=12; j++) {
        //     document.getElementById("p"+j).innerHTML = "Table de :"+j+"<br><br>";
        //     for(let i=1; i<=12; i++) {
        //         document.getElementById("p"+j).innerHTML += i+" x "+j+" = "+ j*i +"<br>";
        //     } 
        // }




        // let tableauElement = [];
        // for (let j = 0; j <= produitTableau.length; j++) {
        //     tableauElement.push(produitTableau[j][_id])
        //     // document.getElementById("p"+j).innerHTML = "Table de :"+j+"<br><br>";
        //     // for(let i=1; i<=12; i++) {
        //     //     document.getElementById("p"+j).innerHTML += i+" x "+j+" = "+ j*i +"<br>";
        //     // } 
        // }
        // console.log("tableauElement", tableauElement);
























        // let additionQuantite = [];
        // rechercheId.forEach((element) => {
        //     // additionQuantite += rechercheId[i];
        //     additionQuantite.push(element.quantite);
        // });
        // console.log("additionQuantite", additionQuantite);
























        // let rechercheQuantite = [];
        // produitTableau.forEach((element) => {
        //     rechercheQuantite.push(element.quantite);
        // });
        // console.log("recherche quantite", rechercheQuantite);
        // let lastItem = rechercheQuantite[rechercheQuantite.length - 1];
        // console.log("Last element is", lastItem);


        // let additionQuantite = 0;
        // for (let i = 0; i < rechercheQuantite.length; i++) {
        //     additionQuantite += rechercheQuantite[i];
        // }
        // console.log("additionQuantite", additionQuantite);











        // const array = [1, 2, 3, 4];
        // let sum = 0;

        // for (let i = 0; i < array.length; i++) {
        //     sum += array[i];
        // }
        // console.log(sum);


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
                            (alert("Ajout de   " + Number(nombreArticles.value) + " canapés     " + produitTableau[i].name + "    de couleur    " + produitTableau[i].colors + "    au panier."))
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
                            (alert("Ajout de   " + Number(nombreArticles.value) + " canapés     " + produitTableau[i].name + "    de couleur    " + produitTableau[i].colors + "    au panier."))
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

