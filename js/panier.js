let storageCart = localStorage.getItem('cart');
const productsLists = JSON.parse(storageCart);
let globalPrice = 0;
let globalQuantity = 0;
let PriceOfProduct
let QuantityOfProduct
let totalPriceProduct



if (productsLists != null) {


    for (let i = 0; i < productsLists.length; i++) {
        PriceOfProduct = productsLists[i].productPrice;
        QuantityOfProduct = productsLists[i].productQuantity;
        totalPriceProduct = PriceOfProduct * QuantityOfProduct;
        nameOfProduct = productsLists[i].name;
        colorOfProduct = productsLists[i].color;
        imageOfProduct = productsLists[i].image;



        globalPrice += totalPriceProduct;
        globalQuantity += QuantityOfProduct;

        const cartContent = document.getElementById('cart-content');

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
                <input class="result" type="text" value="${QuantityOfProduct}"  maxlength="2" />
                <input class="plus" type="button" value="+" />
            </div>
        </div>
        `
        let plusElements = document.querySelectorAll('.plus');
        let moinsElements = document.querySelectorAll('.moins');

        let resultElements = document.querySelectorAll('.result');


        resultElements.forEach(resultElement => {
            let result = parseInt(resultElement.value, 10);

            plusElements.forEach(plusElement => {
                plusElement.addEventListener('click', () => {
                    if (result >= 0 && result < 99) {
                        result++;
                        resultElement.value = result;
                        console.log(result);
                        localStorage.setItem('cart', JSON.stringify(productsLists));
                        // string to save local storage

                    }
                });
            });




            moinsElements.forEach(moinsElement => {
                moinsElement.addEventListener('click', () => {
                    if (result > 0 && result <= 99) {
                        result--;
                        QuantityOfProduct = result;
                        localStorage.setItem('cart', JSON.stringify(productsLists)); // string to save local storage

                    }
                });
            });
        });


    }









    const projHeader = document.getElementById('heading');
    projHeader.innerHTML += `
    <h2> Total:  (${globalQuantity} articles ) <span>${globalPrice} € </span></h2>
        `

}