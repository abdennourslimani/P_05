 productsLists = loadFromStorage('cart')
 let cartContent = document.getElementById('cart-content');
 let cartFlex = document.getElementById('cart-flex');
 let h1 = document.getElementById('h1')
 let heading = document.getElementById('heading')

 if (productsLists != null) {
     productsLists.forEach(productsList => {
         displayProductCart(productsList)
         displayItems()
     });
 } else {
     emptyCart()
 }


 // remove product 

 let trushIcons = document.querySelectorAll('.fa-trash');
 trushIcons.forEach(trush => {
     removeButton(trush);

 })

 // boutton plus 


 let plusElements = document.querySelectorAll('.plus');
 plusElements.forEach(plus => {
     addbutton(plus)


 });

 // boutton moins 

 let moinsElements = document.querySelectorAll('.moins');
 moinsElements.forEach(moinsElement => {
     supprimerElements(moinsElement)

 });

 function totalCount() {
     let storage = loadFromStorage('cart');
     let total = 0;
     if (storage != null) {
         storage.forEach(elt => {
             let price = elt.productPrice;
             let quantity = elt.productQuantity;
             total += price * quantity
         })
     } else {
         total = 0
     }

     return total

 }

 function totalItems() {
     let storage = loadFromStorage('cart');
     let total = 0;
     if (storage != null) {
         storage.forEach(elt => {
             let quantity = elt.productQuantity;
             total += quantity

         })
     } else {
         total = 0
     }
     return total


 }

 function displayItems() {
     const projHeader = document.getElementById('heading');
     projHeader.innerHTML = `
    <h2>Total:(${totalItems()} articles ) <span>${totalCount()}€ </span></h2>
        `
 }

 function loadFromStorage(key) {
     return JSON.parse(localStorage.getItem(key));
 }

 function getItemsIDs(key) {
     let productsIDS = [];
     let storage = loadFromStorage(key)
     if (storage.length > 0) {
         storage.forEach(element => {
             productsIDS.push(element.id)

         });
     }
     return productsIDS

 }







 // ---------------obj regex -------
 let regexString = /[a-zA-Z]/;
 let regexMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
 let regexSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;
 let regexNumber = /[0-9]/;





 let submit = document.getElementById('submit')
 submit.addEventListener('click', (e) => {
     e.preventDefault()

     let products = []

     lastNameInuptValue = document.getElementById('lastname').value
     firstNameInuptValue = document.getElementById('firstname').value
     adressInuptValue = document.getElementById('adress').value
     cityInuptValue = document.getElementById('city').value

     missingLastName = document.getElementById('missingLastName')
     missingFirstName = document.getElementById('missingFirstName')
     missingAdress = document.getElementById('missingAdress')
     missingCity = document.getElementById('missingCity')
     missingEmail = document.getElementById('missingEmail')
     missingPhone = document.getElementById('missingPhone')


     emailInuptValue = document.getElementById('email').value
     phoneInuptValue = document.getElementById('phone').value

     let isFormOK = true;

     if (regexNumber.test(lastNameInuptValue) || regexMail.test(lastNameInuptValue) || regexSpecialCharacter.test(lastNameInuptValue) || lastNameInuptValue === "") {
         missingLastName.textContent = 'choisissez un nom juste';
         isFormOK = false;
     }
     if (regexNumber.test(firstNameInuptValue) || regexMail.test(firstNameInuptValue) || regexSpecialCharacter.test(firstNameInuptValue) || firstNameInuptValue === "") {
         missingFirstName.textContent = 'choisissez un prenom juste';
         isFormOK = false;
         console.log('bien arivé ici')

     }
     if (regexSpecialCharacter.test(adressInuptValue) || adressInuptValue === "" || regexMail.test(adressInuptValue)) {
         missingAdress.textContent = 'choisissez une adresse juste'
         isFormOK = false;
     }
     if (regexSpecialCharacter.test(cityInuptValue) || cityInuptValue === "" || regexMail.test(cityInuptValue)) {
         missingCity.textContent = 'choisissez une ville juste'
         isFormOK = false;


     }
     if (regexMail.test(emailInuptValue) === false || emailInuptValue === "") {
         missingEmail.textContent = 'choisissez un email juste'
         isFormOK = false;


     }
     if (regexNumber.test(phoneInuptValue) === false || phoneInuptValue === "" || regexMail.test(phoneInuptValue) || regexString.test(phoneInuptValue) || regexSpecialCharacter.test(phoneInuptValue)) {
         missingPhone.textContent = 'remplissez champ telephone correctement'
         isFormOK = false;



     }
     if (isFormOK = true) {
         contact = {
             "firstName": firstNameInuptValue,
             "lastName": lastNameInuptValue,
             "address": adressInuptValue,
             "city": cityInuptValue,
             "email": emailInuptValue
         }
         products = getItemsIDs('cart');


         fetch("http://localhost:3000/api/teddies/order", {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                     contact: contact,
                     products: products
                 })

             })
             .then(Response => Response.json())
             .then(result => {
                 console.log(result)
                 if (products.length > 0) {
                     let orderLists = [];
                     orderId = result.orderId;
                     orderFirstName = result.contact.firstName;
                     orderLastName = result.contact.lastName;
                     priceOrder = totalCount();

                     let item = {
                         'orderId': orderId,
                         'firstName': orderFirstName,
                         'lastName': orderLastName,
                         'price': priceOrder
                     }
                     orderLists.push(item)
                     console.log("orderlist", orderLists)
                     sessionStorage.setItem('orderList', JSON.stringify(orderLists));
                     window.location.href = 'confirmation.html'
                     localStorage.clear()


                 } else {
                     alert("votre panier est vide merci de le remplir tout d'abord ")
                 }
             })
     }

 })



 function emptyCart() {
     cartFlex.innerHTML = "<span class='errorCart'>le panier est vide merci de le remplir d'abord</span>"
     h1.remove()
     heading.remove()
 }


 function displayProductCart(productsList) {
     PriceOfProduct = productsList.productPrice;
     QuantityOfProduct = productsList.productQuantity;
     totalPriceProduct = PriceOfProduct * QuantityOfProduct;
     nameOfProduct = productsList.name;
     colorOfProduct = productsList.color;
     imageOfProduct = productsList.image;
     idOfProduct = productsList.id;


     cartContent.innerHTML += `
       <div class="cart-prev">
           <div class="cart-prev-image">
               <img src="${imageOfProduct}">
           </div>

           <div class="cart-prev-description">
               <h3> ${nameOfProduct}</h2>
               <p> couleur :${colorOfProduct}</p>
               <p> ${PriceOfProduct} €</p>
               <div class=flex>
               <input class="moins" type="button" value="-" />
               <input class="result" type="text" value="${QuantityOfProduct}" data-productID="${idOfProduct}" data-productColor="${colorOfProduct}" maxlength="2" />
               <input class="plus" type="button" value="+" />
               <i class="fa fa-trash"  data-productID="${idOfProduct}" data-productColor="${colorOfProduct}" ></i>
               <div>

           </div>
       </div>
       `
 }


 function removeButton(trushIcon) {
     trushIcon.addEventListener('click', () => {
         let idTrush = trushIcon.getAttribute('data-productID');
         let colorTrush = trushIcon.getAttribute('data-productColor');
         let index
         let removeIcons = document.querySelectorAll('.cart-prev');

         productsLists.find(elt => {
             if (elt.id === idTrush && elt.color === colorTrush) {
                 index = productsLists.indexOf(elt);
             }
         })
         removeIcons[index].parentNode.removeChild(removeIcons[index])
         productsLists.splice(index, 1)
         localStorage.setItem('cart', JSON.stringify(productsLists))
         displayItems()

     })

 }



 function addbutton(plusElement) {
     plusElement.addEventListener('click', (e) => {
         idSibling = plusElement.previousElementSibling.getAttribute('data-productID')
         colorSibling = e.target.previousElementSibling.getAttribute('data-productColor')

         productsLists.find(elt => {
             if (elt.id === idSibling && elt.color === colorSibling && elt.productQuantity <= 98) {
                 elt.productQuantity++
                     localStorage.setItem('cart', JSON.stringify(productsLists))
                 plusElement.previousElementSibling.value++
                     displayItems()

             }
         });
     });
 }

 function supprimerElements(moinsElements) {
     moinsElements.addEventListener('click', (e) => {
         idSibling = moinsElements.nextElementSibling.getAttribute('data-productID')
         colorSibling = e.target.nextElementSibling.getAttribute('data-productColor')

         productsLists.find(elt => {
             if (elt.id === idSibling && elt.color === colorSibling && elt.productQuantity > 1) {
                 elt.productQuantity--
                     localStorage.setItem('cart', JSON.stringify(productsLists))
                 moinsElements.nextElementSibling.value--
                     displayItems()




             }
         });
     });
 }