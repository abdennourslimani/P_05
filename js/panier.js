 productsLists = JSON.parse(localStorage.getItem('cart'))

 if (productsLists != null) {

     productsLists.forEach(productsList => {
         PriceOfProduct = productsList.productPrice;
         QuantityOfProduct = productsList.productQuantity;
         totalPriceProduct = PriceOfProduct * QuantityOfProduct;
         nameOfProduct = productsList.name;
         colorOfProduct = productsList.color;
         imageOfProduct = productsList.image;
         idOfProduct = productsList.id;






         cartContent = document.getElementById('cart-content');

         cartContent.innerHTML += `
            <div class="cart-prev">
                <div class="cart-prev-image">
                    <img src="${imageOfProduct}">
                </div>
    
                <div class="cart-prev-description">
                    <h3> ${nameOfProduct}</h2>
                    <p> couleur :${colorOfProduct}</p>
                    <p> ${PriceOfProduct} €</p>
                    <input class="moins" type="button" value="-" />
                    <input class="result" type="text" value="${QuantityOfProduct}" data-productID="${idOfProduct}" data-productColor="${colorOfProduct}" maxlength="2" />
                    <input class="plus" type="button" value="+" />
                    <i class="fa fa-trash" aria-hidden="true" data-productID="${idOfProduct}" data-productColor="${colorOfProduct}" ></i>
                    
                </div>
            </div>
            `

     });
 }
 displayItems()




 // remove product 

 let trushIcons = document.querySelectorAll('.fa-trash');

 trushIcons.forEach(trushIcon => {
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


 })

 // boutton plus 


 let plusElements = document.querySelectorAll('.plus');
 plusElements.forEach(plusElement => {

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
 });

 // boutton moins 

 let moinsElements = document.querySelectorAll('.moins');
 moinsElements.forEach(moinsElements => {

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
 });

 function totalCount() {
     let storage = loadFromStorage('cart');
     let total = 0;

     storage.forEach(elt => {
         let price = elt.productPrice;
         let quantity = elt.productQuantity;
         total += price * quantity

     })
     return total

 }

 function totalItems() {
     let storage = loadFromStorage('cart');
     let total = 0;
     storage.forEach(elt => {
         let quantity = elt.productQuantity;
         total += quantity

     })
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








 // ---------------obj regex -------
 let regexString = /[a-zA-Z]/;
 let regexMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
 let regexSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;
 let regexNumber = /[0-9]/;





 let submit = document.getElementById('submit')

 submit.addEventListener('click', (e) => {
     e.preventDefault()
     products = []

     lastNameInuptValue = document.getElementById('lastname').value
     firstNameInuptValue = document.getElementById('firstname').value
     adressInuptValue = document.getElementById('adress').value
     cityInuptValue = document.getElementById('city').value

     emailInuptValue = document.getElementById('email').value
     phoneInuptValue = document.getElementById('phone').value

     if (regexNumber.test(lastNameInuptValue) || regexMail.test(lastNameInuptValue) || regexSpecialCharacter.test(lastNameInuptValue) || lastNameInuptValue === "") {
         alert('remplissez le champ nom correctement')
     } else if (regexNumber.test(firstNameInuptValue) || regexMail.test(firstNameInuptValue) || regexSpecialCharacter.test(firstNameInuptValue) || firstNameInuptValue === "") {
         alert('remplissez le champ prenom correctement')

     } else if (regexSpecialCharacter.test(adressInuptValue) || adressInuptValue === "" || regexMail.test(adressInuptValue)) {
         alert('remplissez le champ adresse correctement')

     } else if (regexSpecialCharacter.test(cityInuptValue) || cityInuptValue === "" || regexMail.test(cityInuptValue)) {
         alert('remplissez le champ ville correctement')

     } else if (regexMail.test(emailInuptValue) === false || emailInuptValue === "") {
         alert('remplissez le champa mail correctement')

     } else if (regexNumber.test(phoneInuptValue) === false || phoneInuptValue === "" || regexMail.test(phoneInuptValue) || regexString.test(phoneInuptValue) || regexSpecialCharacter.test(phoneInuptValue)) {
         alert('remplissez le champ telephone correctement')

     } else {
         alert('donnée envoyée')

         contact = {
             firstname: firstNameInuptValue,
             lastname: lastNameInuptValue,
             adress: adressInuptValue,
             city: cityInuptValue,
             email: emailInuptValue
         }
         let products = getItemsIDs('cart');
         const myCart = { contact: contact, products: products };
         console.log(myCart);




         fetch("http://localhost:3000/api/teddies/order", {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(myCart)
             })
             .then(Response => Response.json())
             .then(result => {
                 console.log(result)

             })



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




 })