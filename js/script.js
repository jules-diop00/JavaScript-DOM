/* Execution du script aprés le changement du DOM, cette ligne s'assure que le script
 s'execute uniquement après que tout le contenu HTML soit chargé
  et que le DOM soit complètement chargé.*/
let panier = [];
document.addEventListener("DOMContentLoaded", function(){
    // Sélection des élements HTML dont on a besoin 
    // Selectionner toutes les boutons plus
    let plusButtons = document.querySelectorAll(".fa-plus-circle");
    // Selectionner toutes les boutons moins
    let minusButtons = document.querySelectorAll(".fa-minus-circle");
    // Selectionner tous les boutons poubelles
    let deleteButtons = document.querySelectorAll(".fa-trash-alt");
    // Slectionner toutes les boutons coeurs
    let heartButtons = document.querySelectorAll(".fa-heart");
    //Selectionne l'element afficher la total
    let totalElement = document.querySelector(".total");

    //Mettre a jour le prix total
    //Declarer une fonction pour calculer le prix total
    function updateTotal(){
        //Initialise la variable du total
        let total = 0;
        // Selectionne toutes les produits affichés dans le panier
        let products = document.querySelectorAll(".card-body");

        //Parcourir chque produit et récupérer son prix et sa quantité
        products.forEach(product => {
            let unitPrice = parseFloat(product.querySelector(".unit-price").textContent.replace("$",""));
            let quantity = parseInt(product.querySelector(".quantity").textContent);

            //Vérifier si les valeurs sont valides
            if (isNaN(unitPrice) || isNaN(quantity)){
                console.error("Le prix ou la quantité n'est pas un nombre valide")
                return;
            }
            //Calcul du total, on additionne prix * quantity
            total += unitPrice * quantity;

        });

        //Mise à jour de l'affichage total
        totalElement.textContent = total + "$";

    }

    // Gestion de l'ajout de quantité
    // Ajouter un événement sur chaque bouton plus
    plusButtons.forEach(button => {
        // Ajouter un événement click
        button.addEventListener("click", function() {
            // Récupérer le parent de l'élement
        let quantityElement = this.nextElementSibling;
        // convertit sa valeur en quantité 
        let quantity = parseInt(quantityElement.textContent);
        // Incrémente la quantité
        quantity++;
        // Mettre à jour la valeur de la quantité
        quantityElement.textContent = quantity;
        // Appel de la fonction updateTotal pour mettre à jour le prix total
        updateTotal();
        });
    });

    // Gestion de la dimunition de quantité
    minusButtons.forEach(button => {
        // Diminuer un élément click
        button.addEventListener("click", function(){
        //Récuperer le parent de l'élement
        let quantityElement = this.previousElementSibling;
        let quantity = parseInt(quantityElement.textContent);
        //Vérifier si la quantité est supérieur à 0
        if (quantity >= 0) {
            quantity --;
            //Mettre à jour la valeur de la quantité
            quantityElement.textContent = quantity;
            //Appel de la fonction updateTotal pour mettre à jour le prix total
            updateTotal();
        }
        });
    });

    //Gestion de la suppression d'un produit
    deleteButtons.forEach(button => {
        // Ajouter un événement click
        button.addEventListener("click", function(){
            // Ajouter une condition pour vérifier si le produit est supprimé
            if (confirm("Voulez vous supprimer ce produit")){
                // Récupérer le parent de l'élement
                let product = this.closest(".card-body");
                // Supprimer le produit
                product.remove();
                // Appel de la fonction updateTotal pour mettre à jour le prix total
                updateTotal();
            }
        });
    });
    // Gestion des favoris
    heartButtons.forEach(button => {
        // Ajouter un événement click
        button.addEventListener("click", function(){
            // Ajoute ou enléve la classe favorite
            this.classList.toggle("favorite");
            // Si l'element est ajouter comme favorit mettre la couleur rouge
            if (this.classList.contains("favorite")){
                this.style.color = "red";
            } // Sinon mettre la couleur noir
            else{ 
                this.style.color = "black";
            }
        });
            
    });

});
