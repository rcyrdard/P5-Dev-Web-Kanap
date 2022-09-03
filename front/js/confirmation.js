
const commandes = JSON.parse(localStorage.getItem("commandes"));

let numerosDeCommande = document.getElementById("orderId");


///////////  AFFICHER LE NUMEROS DE LA COMMANDE  /////////////////

const commandeDispaly = async () => {
    console.log("fonction commande");

    if (commandes) {
        await commandes;
        const lastElement = commandes[commandes.length - 1];
        console.log("dernier element :", lastElement);
        numerosDeCommande.innerText = `${lastElement.order}`;
    }

}

commandeDispaly();
