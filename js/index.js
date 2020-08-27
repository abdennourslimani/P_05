let productSell = 'teddies';

const urlApi = 'http://localhost:3000/api/' + productSell + '/';

//const url2 = 'http://localhost:3000/api/furniture';
//onst url3 = 'http://localhost:3000/api/cameras';

// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
/*function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function() {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

ajaxGet(urlApi, (reponse) => {
    // Transforme la réponse en tableau d'objets JavaScript
    var elements = JSON.parse(reponse);
    // Affiche les infos  du tableau
    elements.forEach((element) => {
        console.log(element);
        const tedy = new Teddy(element);
        tedy.displayInList('content');

    })
});*/



fetch(urlApi)
    .then(Response => Response.json())
    .then(result => {
        console.log(result);
        result.forEach(element => {
            const tedy = new Teddy(element);
            tedy.displayInList('content');

        })
    }).catch(error => {

        document.getElementById('content').innerHTML = "<span class='error_server' > erreur:vérifiez votre serveur s'il vous plait</span>"

    })







/* fetch(url1)
          .then(Response => Response.json())
          .then(result => {
              console.log(result);
              result.forEach(element => {
                  let img = document.createElement('img');
                  img.src = element.imageUrl;
                  img.width = '400';
                  document.getElementById('content').appendChild(img);

              });



          });
      fetch(url2)
          .then(Response => Response.json())
          .then(result => {
              console.log(result);
              result.forEach(element => {
                  let img = document.createElement('img');
                  img.src = element.imageUrl;
                  img.width = '400';
                  document.getElementById('content').appendChild(img);

              });



          });
      fetch(url3)
          .then(Response => Response.json())
          .then(result => {
              console.log(result);
              result.forEach(element => {
                  let img = document.createElement('img');
                  img.src = element.imageUrl;
                  img.width = '400';
                  document.getElementById('content').appendChild(img);

              });
          })*/