let productsData = [];
let items = document.getElementById('items');


const fetchProducts = async () => {
    await fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((promise) => {
            productsData = promise;
            console.log(productsData);
        })
        .catch(function (error) {
            alert(error)
        })
};


///////////////////  AFFICHAGE DES PRODUITS SUR LA PAGE INDEX  /////////////////////////

const productsDisplay = async () => {
    await fetchProducts();
    items.innerHTML = productsData.map((product) =>
        `<a href="product.html?${product._id}">
                        <article>
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                        <h3 class="productName">${product.name}</h3>
                        <p class="productDescription">${product.description} </p>
                        </article>
                        </a>`,
    )
        .join("");
};
productsDisplay();

