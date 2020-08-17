order = loadFromSessionStorage('orderList');


order.forEach(element => {
    firstName = element.firstName
    lastName = element.lastName
    orderId = element.orderId
})

let orderContent = document.getElementById('confirmation-content');

orderContent.innerHTML += `<p id="orderMessage"> Merci monsieur <span class="name-order">${firstName} ${lastName}</span> pour votre commande</br> 
enregistrée sous le numéro ${orderId}
</p>
 `
setTimeout(function() { window.location.href = 'index.html'; }, 3000);


function loadFromSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key))
}