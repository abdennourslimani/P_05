let globalPrice = 0;
let globalQuantity = 0;
let PriceOfProduct
let QuantityOfProduct
let totalPriceProduct
let cartContent


loadStorage = (key) => {
    storageCart = localStorage.getItem(key);
    productsLists = JSON.parse(storageCart);

}


loadStorage('cart');


if (productsLists != null) {

    productsLists.forEach(productsList => {
        PriceOfProduct = productsList.productPrice;
        QuantityOfProduct = productsList.productQuantity;
        totalPriceProduct = PriceOfProduct * QuantityOfProduct;
        nameOfProduct = productsList.name;
        colorOfProduct = productsList.color;
        imageOfProduct = productsList.image;
        idOfProduct = productsList.id;




        globalPrice += totalPriceProduct;
        globalQuantity += QuantityOfProduct;

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



const projHeader = document.getElementById('heading');
projHeader.innerHTML += `
<h2> Total:  (${globalQuantity} articles ) <span>${globalPrice} € </span></h2>
    `
    // remove product 

let trushIcons = document.querySelectorAll('.fa-trash');

trushIcons.forEach(trushIcon => {
    trushIcon.addEventListener('click', () => {
        let idTrush = trushIcon.getAttribute('data-productID');
        let colorTrush = trushIcon.getAttribute('data-productColor');


        productsLists.find(elt => {
            if (elt.id === idTrush && elt.color === colorTrush) {
                productsLists.splice(productsLists.indexOf(elt), 1)
                localStorage.setItem('cart', JSON.stringify(productsLists))

                window.location.reload()

            }

        })

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
                    window.location.reload()


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
                    window.location.reload()


            }
        });
    });
});


// ---------------obj regex -------
let regexString = /[a-zA-Z]/;
let regexMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
let regexSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;
let regexNumber = /[0-9]/;






let submit = document.getElementById('submit')

submit.addEventListener('click', (e) => {
    e.preventDefault()
    lastNameInuptValue = document.getElementById('lastname').value
    firstNameInuptValue = document.getElementById('firstname').value
    adressInuptValue = document.getElementById('adress').value
    emailInuptValue = document.getElementById('email').value
    phoneInuptValue = document.getElementById('phone').value

    if (regexNumber.test(lastNameInuptValue) || regexMail.test(lastNameInuptValue) || regexSpecialCharacter.test(lastNameInuptValue) || lastNameInuptValue === "") {
        alert('remplissez le champ correctement')
    } else if (regexNumber.test(firstNameInuptValue) || regexMail.test(firstNameInuptValue) || regexSpecialCharacter.test(firstNameInuptValue) || firstNameInuptValue === "") {

        alert('remplissez le champ correctement')

    } else if (regexSpecialCharacter.test(adressInuptValue) || adressInuptValue === "" || regexMail.test(adressInuptValue)) {
        alert('remplissez le champ correctement')
    } else if (regexMail.test(emailInuptValue) === false || emailInuptValue === "") {
        alert('remplissez le champ correctement')

    } else if (regexNumber.test(phoneInuptValue) === false || phoneInuptValue === "" || regexMail.test(phoneInuptValue) || regexString.test(phoneInuptValue) || regexSpecialCharacter.test(phoneInuptValue)) {
        alert('remplissez le champ telephone correctement')

    } else {
        alert('donnée envoyée')
        contact = {
            'lastname': lastNameInuptValue,
            'firstname': firstNameInuptValue,
            'adress': adressInuptValue,
            'email': emailInuptValue,
            'phone': phoneInuptValue
        }
        return contact
    }

})







/*if (regexNumber.test(lastNameInuptValue) === true || regexMail.test(lastNameInuptValue) === true || regexSpecialCharacter.test(lastNameInuptValue) === true || lastNameInuptValue === "") {
    console.log('entrez un nom valide svp')

}*/





























/*let resultElements = document.querySelectorAll('.result');

for (let i = 0; i < resultElements.length; i++) {
    resultElement = resultElements[i].value;
    result = parseInt(resultElement, 10); // récupérer l ancienne valeur 
    console.log(result);
}

for (let i = 0; i < plusElements.length; i++) {
    plusElements[i].addEventListener('click', () => {
        if (result >= 0 && result < 99) {
            result++;
        }
    });
}*/

/*plusElements.forEach(plusElement => {
    plusElement.addEventListener('click', () => {
        if (result >= 0 && result < 99) {
            result++;

        }
    });
});*/


/* moinsElements.forEach(moinsElement => {
     moinsElement.addEventListener('click', () => {
         if (result > 0 && result <= 99) {
             result++;
             resultElement.value = result;
         }
     });
 });*/