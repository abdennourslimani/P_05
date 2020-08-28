const urlApi = 'http://localhost:3000/api/teddies';
let url = window.location.search;
const urlparams = new URLSearchParams(url);
const urlid = urlparams.get('id');

let cart = []

function loadStorage(key) {
    return storageCart = localStorage.getItem(key);

}
fetch(urlApi + '/' + urlid)
    .then(Response => Response.json())
    .then(result => {
        const tedyCostomize = new Teddy(result);
        tedyCostomize.displayItem('content');

        document.getElementById('add-to-cart').addEventListener('click', (e) => {
            e.preventDefault
                //récupération panier du storage
            loadStorage('cart')

            if (storageCart !== null) {
                cart = JSON.parse(storageCart);
            }
            // recupération du id et color 
            let id = result._id;
            let color = document.getElementById('teddy-select').value;
            let price = result.price;
            let name = result.name;
            let image = result.imageUrl;

            let productFound = cart.find(element => element.id == id && element.color == color);

            //préparation de objet avant insertion dans le tableau panier 
            if (color !== "") {

                let item = {
                    'id': id,
                    'color': color,
                    'productPrice': price,
                    'name': name,
                    'image': image,
                }

                if (productFound == undefined) {
                    let productQuantity = 1;
                    item.productQuantity = 1;
                    // creation tableau objet produits
                    cart.push(item);
                    //console.log(cart);

                } else {
                    console.log(productFound)
                    productFound.productQuantity++;


                }
                saveStorage('cart', cart)
                window.location.href = 'panier.html'


            } else {
                colorEmpty('optionColor');
            }

        })
    }).catch(error => {
        errorUrlProduct('content')

    })

function errorUrlProduct(location) {
    document.getElementById(location).innerHTML = '<span class="error_product>choississez un produit svp</span>'

}

function colorEmpty(place) {
    document.getElementById(place).innerHTML = '<span>Merci de choisir une couleur avant de valider</span>'

}

function saveStorage(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}