const urlApi = 'http://localhost:3000/api/teddies';
let url = window.location.search;
const urlparams = new URLSearchParams(url);
const urlid = urlparams.get('id');
console.log(urlid);



let panier = [];

fetch(urlApi + '/' + urlid)
    .then(Response => Response.json())
    .then(result => {
        const tedyCostomize = new Teddy(result);
        tedyCostomize.displayItem('content');
        document.getElementById('add-to-cart').addEventListener('click', () => {
            //récupération ID , color 

            let id = result._id;


            let color = document.getElementById('teddy-select').value;
            if (color !== "") {
                let item = {
                    'id': id,
                    'color': color,

                }
                panier.push(item);
                console.log(panier);
                //ajouter au tableau panier 



                //transformer chaine de caractére 

                // local storage ajouter panier 

            } else {
                alert('choisissez une couleur ');
            }









        })




    }).catch(error => {
        console.log(error);

    });