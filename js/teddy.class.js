class Teddy {
    constructor(data) {
        this.name = data.name;
        this.imageUrl = data.imageUrl;
        this.price = data.price;
        this.description = data.description;
        this.id = data._id;
        this.colors = data.colors;
    }

    displayInList = (location) => {
        const tedylocation = document.getElementById(location);
        tedylocation.innerHTML += `<article class=" teddyarticle-prev  ">
                         <a href="product.html?id=${this.id}"><img src="${this.imageUrl}" width="400" alt="${this.name}">
                         <div class="title-flex">
                            <p class="teddyarticle-prev__title"> ${this.name}</p>
                            <p class="teddyarticle-prev__subtitle"> ${this.price} €</p>
                            </div>
                         </a>
                         </article> `
    }

    displayItem = (location) => {
        const tedylocation = document.getElementById(location);
        tedylocation.innerHTML += `
                        <div class="proj-prev__image">
                            <img src="${this.imageUrl}" width="400" height="400" alt="${this.name}"> 
                         </div>
                         <div class="proj-prev__description">
                            <p class="teddyarticle-prev__title"> ${this.name}</p>
                            <p class="teddyarticle-prev__title"> ${this.description}</p>
                        </div>
                        <div class="proj-prev__price">
                             <p class="teddyarticle-prev__subtitle"> ${this.price} €</p>
                             <label for="teddy-select">choisissez une couleur :</label>
                                 <select name="teddys" id="teddy-select">
                                </select>
                             <button type="button"  id ="add-to-cart" class="add-to-cart">Ajouter au panier</button>

                        </div>
                             `
        this.customizeColor();
    }

    customizeColor = () => {
        const tedycolor = document.getElementById('teddy-select');
        let options = '<option value="" id="optionColor">--Please choose an option--</option>'

        for (let i = 0; i < this.colors.length; i++) {
            options += '<option value="' + this.colors[i] + '">' + this.colors[i] + '</option>"';
        }
        tedycolor.innerHTML += options;

    }

};