const product = window.location.search.split("?").join("");

let productsData = [];
let affichageQuantite = document.getElementById("totalQuantity");


const fetchproduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
        .then((res) => res.json())
        .then((promise) => {
            productsData = promise;
            // console.log(promise);
        })
        .catch((error) => {
            alert(error)
        })
};


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


const addCanape = () => {
    let bouton = document.getElementById('addToCart');
    bouton.addEventListener("click", () => {
        let produitTableau = JSON.parse(localStorage.getItem("produit"));
        let select = document.getElementById("colors");

        let nombreArticles = document.getElementById("quantity");
        let prixArticle = document.getElementById("price");
        // let coupTotal = (nombreArticles * prixArticle);


        // console.log(produitTableau);

        const fusionProduitColors = Object.assign({}, productsData, {
            colors: `${select.value}`,
            quantite: 1,
            quantite: `${nombreArticles.value}`,

            // price: `${(nombreArticles.value) * (prixArticle.value)}`
            // price: `${(coupTotal.value)}`
            // price: `${(price * quantite)}`
        });
        console.log(fusionProduitColors);

        if (produitTableau == null) {
            produitTableau = [];
            meubleQuantiteTotal = [];
            produitTableau.push(fusionProduitColors);
            // console.log(produitTableau);
            localStorage.setItem("produit", JSON.stringify(produitTableau));
            // produitTableau = JSON.parse(localStorage.getItem("produit"));
            // spanQuantite.textContent = addQuantity(produitTableau);

        } else if (produitTableau != null) {
            meubleQuantiteTotal = [];

            for (i = 0; i < produitTableau.length; i++) {
                if (
                    produitTableau[i]._id == productsData._id &&
                    produitTableau[i].colors == select.value
                ) {
                    return (
                        produitTableau[i].quantite++,
                        console.log("quantite++"),
                        localStorage.setItem("produit", JSON.stringify(produitTableau)),
                        (produitTableau = JSON.parse(localStorage.getItem("produit"))),
                        console.log("yorchi !")
                        // (affichageQuantite.textContent = produitTableau)

                        // (affichageQuantite.textContent = addQuantity(produitTableau)),
                    );
                }
            }

            for (i = 0; i < produitTableau.length; i++) {
                if (
                    (produitTableau[i]._id == productsData._id &&
                        produitTableau[i].colors != select.value) ||
                    produitTableau[i]._id != productsData._id
                ) {
                    return (
                        produitTableau.push(fusionProduitColors),
                        localStorage.setItem("produit", JSON.stringify(produitTableau)),
                        (produitTableau = JSON.parse(localStorage.getItem("produit")))
                        // (affichageQuantite.textContent = produitTableau)

                        // (spanQuantite.textContent = addQuantity(produitTableau))
                    );
                }
            }
        }
    });
    return (
        (produitTableau = JSON.parse(localStorage.getItem("produit")))
        // (affichageQuantite.textContent = produitTableau)

        //     (spanQuantite.textContent = addQuantity(produitTableau))
    );
};