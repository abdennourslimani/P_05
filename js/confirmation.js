order = loadFromSessionStorage('orderList');


order.forEach(element => {
    confirmMessage(element, 'confirmation-content')

    setTimeout(function() { window.location.href = 'index.html'; }, 3000);

});

function loadFromSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key))
}



function confirmMessage(element, location) {
    firstName = element.firstName
    lastName = element.lastName
    orderId = element.orderId
    priceOrder = element.price

    let orderContent = document.getElementById(location);
    orderContent.innerHTML += `<p id="orderMessage"> Merci monsieur <span class="name-order">${firstName} ${lastName}</span> pour votre commande</br> 
    enregistrée sous le numéro ${orderId} </br>
    prix de la commande est : ${priceOrder} €
    </p>
    `
}