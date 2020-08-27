const urlApi = 'http://localhost:3000/api/teddies';
let url = window.location.search;
const urlparams = new URLSearchParams(url);
const urlid = urlparams.get('id');

let cart = []



fetch(urlApi + '/' + urlid)
    .then(Response => Response.json())
    .then(result => {
        const tedyCostomize = new Teddy(result);
        tedyCostomize.displayItem('content');


        document.getElementById('add-to-cart').addEventListener('click', () => {


            //récupération panier du storage
            let storageCart = localStorage.getItem('cart');
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
                localStorage.setItem('cart', JSON.stringify(cart)); // string to save local storage
                // localStorage.clear();
                window.location.href = 'panier.html'


            } else {
                alert('choisissez une couleur ');
            }

        })
    }).catch(error => {
        document.getElementById('content').innerHTML = '<span class="error_product>choississez un produit svp</span>'


    })