//VARIABLES
let code;
let macrosTitle = ["Energy", "Carbohydrates", "Sugars", "Proteins", "Fat", "Saturated fat", "Salt"]
let macrosName = ["energy-kcal", "carbohydrates", "sugars", "proteins", "fat", "saturated-fat", "salt"]
let macros = [
    { title: "Energy", name: "energy-kcal", icon: `<i class="fas fa-fire-alt icon__size"></i>` },
    { title: "Carbohydrates", name: "carbohydrates", icon: `<i class="fas fa-bread-slice icon__size"></i>` },
    { title: "Sugars", name: "sugars", icon: `<i class="fas fa-ice-cream icon__size"></i>` },
    { title: "Proteins", name: "proteins", icon: `<i class="fas fa-drumstick-bite icon__size"></i>` },
    { title: "Fat", name: "fat", icon: `<i class="fas fa-pizza-slice icon__size"></i>` },
    { title: "Saturated fat", name: "saturated-fat", icon: `<i class="fas fa-bacon icon__size"></i>` },
    { title: "Salt", name: "salt", icon: `<i class="fas fa-cube icon__size"></i>` }
]
// let tagIcons = [
//     {'palm oil free':``},
//     {'vegeterian':`<i class="fas fa-leaf icon__size"></i>`},
//     {'vegan':`<i class="fas fa-seedling icon__size"></i>`},
// ]
let nutriments = [];
let firstQuantity;
let secondQuantity;
let percent = 100;
let servingQuantity;
let selectClicked = false;
let ingredients = [];
let ingredientsClicked = false;
let tags = [];
let correctedTags = [];
let tagsClicked = false;
let products = [];

//GET
function httpGet(theUrl, callback) {

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        console.log("checkpoint");
    }
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xmlHttp.send();
};

//SHOW DATA
function showData(data) {
    objProduct = JSON.parse(data);
    console.log(objProduct);
    console.log(objProduct.product);
    if (objProduct.status_verbose == 'product found') {
        //picture
        foodImg.setAttribute('src', objProduct.product.image_url);
        //name
        productName.textContent = objProduct.product.product_name;
        //brand
        if (objProduct.product.brands) {
            productBrand.textContent = objProduct.product.brands.split(",").join(", ");
        }

        //rate
        let labels = objProduct.product.nutrient_levels;

        //nutriments
        for (let i = 0; i <= macros.length - 1; i++) {
            //title text
            let title = document.createElement('p');
            title.classList.add('simpleText');
            //info text
            let info = document.createElement('p');
            info.classList.add('simpleText');
            info.setAttribute('id', 'infoOutput');

            //icon col
            let iconCol = document.createElement('div');
            iconCol.classList.add('col-2', 'macroCard__align');
            iconCol.innerHTML = macros[i]['icon'];
            //title col
            let titleCol = document.createElement('div');
            titleCol.classList.add('col-4', 'macroCard__align');
            titleCol.appendChild(title);
            title.textContent = macros[i]['title'];
            //info col
            let infoCol = document.createElement('div');
            infoCol.classList.add('col-4', 'macroCard__align');
            infoCol.appendChild(info);
            let index = macros[i]['name'];
            let value = `${index}_value`;
            let unit = `${index}_unit`;
            let productValue = objProduct.product.nutriments[value];
            let productUnit = objProduct.product.nutriments[unit];
            nutriments.push({ value: productValue, unit: productUnit });
            info.textContent = `${productValue * (quantity1.textContent / 100).toFixed(2)} ${productUnit}`;

            //rate col
            //this col is still empty in case I want to add something else
            let rateCol = document.createElement('div');
            rateCol.classList.add('col-2', 'macroCard__align');
            let rate = document.createElement('div');
            rate.classList.add('rate__indicator');
            rateCol.appendChild(rate);

            for (let k = 0; k <= Object.keys(labels).length - 1; k++) {
                if (macros[i]['name'] == Object.keys(labels)[k]) {
                    //check
                    // console.log('hi', macros[i]['name'], Object.keys(labels)[k]);
                    // console.log(labels[macros[i]['name']]);
                    if (labels[macros[i]['name']] == 'low') {
                        rate.classList.add('rate__good')
                    } else if (labels[macros[i]['name']] == "moderate") {
                        rate.classList.add('rate__moderate')
                    } else if (labels[macros[i]['name']]) {
                        rate.classList.add('rate__bad')
                    } else {
                        console.log('Rate not found')
                    }
                }
            }

            //card
            let card = document.createElement('div');
            card.classList.add('row', 'macro__card');
            card.setAttribute('id', macros[i]['title']);
            card.appendChild(iconCol);
            card.appendChild(titleCol);
            card.appendChild(infoCol);
            card.appendChild(rateCol);
            if ((info.textContent.includes(NaN)) || (info.textContent.includes(undefined)) || (info.textContent.includes(null))) {
                card.classList.add('d-none');
            }
            cardsContainer.appendChild(card);

            //quantities
            //SERVING
            if (objProduct.product.serving_quantity && objProduct.product.serving_quantity != percent) {
                servingQuantity = objProduct.product.serving_quantity;
                //NO WATER
            } else if (objProduct.product.serving_quantity && objProduct.product.serving_quantity != percent) {
                servingQuantity = objProduct.product.product_quantity;
                //WEIGHT
            } else {
                servingQuantity = objProduct.product.product_quantity;
            }

            firstQuantity = percent;
            secondQuantity = servingQuantity;
            quantity1.textContent = firstQuantity;
            quantity2.textContent = secondQuantity;
            if ((secondQuantity == "") || (secondQuantity == NaN) || (secondQuantity == null) || (secondQuantity == undefined)) {
                document.querySelector('#quantityOption').classList.add('d-none');
            }

        }

        //ingredients

        // let ingredientsDebug = objProduct.product.ingredients_debug;
        // for (let i = 0; i <= ingredientsDebug.length - 1; i++) {
        //     ingredients.push(ingredientsDebug[i]);
        // }
        // ingredientsText.textContent = ingredients.join("");

        if (objProduct.product.ingredients_text) {
            ingredientsText.textContent = objProduct.product.ingredients_text;
        } else if (objProduct.product.ingredients_text_es) {
            ingredientsText.textContent = objProduct.product.ingredients_text_es;
        } else {
            ingredientsText.textContent = objProduct.product.product_name;
        }

        //tags
        tags = objProduct.product.ingredients_analysis_tags
        if(tags){
            for (let i = 0; i <= tags.length -1; i++){
                let tag = tags[i]
                let correctedTag = [];
                for (let j = 0; j <= tag.length -1; j++){
                    if([j]>2){
                        correctedTag.push(tag[j])
                    }
                }
            correctedTags.push(correctedTag.join('').split('-').join(' '));
            }
            console.log(correctedTags);
            for ( i = 0; i<= correctedTags.length -1; i++){
                let tagTitle = correctedTags[i];
                let tagCard = document.createElement('div');
                tagCard.classList.add('tags__card', 'row');

                let tag__title = document.createElement('p');
                tag__title.textContent = tagTitle;
                tag__title.classList.add('simpleText', 'capitalize')
                
                let tagIconCol = document.createElement('div');
                tagIconCol.classList.add('col-2', 'macroCard__align');
                // tagIconCol.innerHTML = ;
                
                let tagTitleCol = document.createElement('div');
                tagTitleCol.classList.add('col-4', 'macroCard__align');

                tagCard.appendChild(tagIconCol);
                tagCard.appendChild(tagTitleCol);

                tagTitleCol.appendChild(tag__title);
                
                tagsContainer.appendChild(tagCard);
            }

            
        }else{

        }

        main.scrollTo({
            top: 800,
            left: 0,
            behavior: "smooth"
        })

        // let productObject = { 'name': objProduct.product.product_name, 'code': objProduct.product.id, 'img': objProduct.product.image_url };
        // let productsArray = [];

        // if (localStorage.getItem('products')){
        //     products.push(JSON.parse(localStorage.getItem('products')))
        // }
        // localStorage.setItem('products', JSON.stringify(productsArray));

    } else {

    }
}

//CHANGE LINK
function changeLink(productCode) {
    httpGet(`https://cors-anywhere.herokuapp.com/https://world.openfoodfacts.org/api/v0/product/${productCode}.json`, showData);

};

//MAIN DOM ELEMENTS
let body = document.querySelector('body');
let html = document.querySelector('html');
let main = document.querySelector('#main');

// VIEWS
let first = document.querySelector('#first__view');
let second = document.querySelector('#second__view');
let third = document.querySelector('#third__view');
let fourth = document.querySelector('#fourth__view');
let fifth = document.querySelector('#fifth__view');
let sixth = document.querySelector('#sixth__view');
let seventh = document.querySelector('#seventh__view');

//COMPONENTS
let display = document.querySelector('#display');
let loading = document.querySelector('#loading');
let resultContainer = document.querySelector('#result__container');
let result = document.querySelector('#result');
let codeInput = document.querySelector('.code__input');
let foodImg = document.querySelector('.food__img');
let productName = document.querySelector('#productName');
let productBrand = document.querySelector('#productBrand');
let cardsContainer = document.querySelector('#cardsContainer');
let quantitySelect = document.querySelector('#quantitySelect');
let quantity1 = document.querySelector('#quantity1');
let quantity2 = document.querySelector('#quantity2');
let ingredientsCard = document.querySelector('#ingredientsCard');
let ingredientsText = document.querySelector('#ingredientsText');
let tagsContainer = document.querySelector('#tagsContainer');
let footer = document.querySelector("#footer");

// BUTTONS
let firstBullet = document.querySelectorAll('.bullet__point')[0];
let secondBullet = document.querySelectorAll('.bullet__point')[1];
let thirdBullet = document.querySelectorAll('.bullet__point')[2];
let startButton = document.querySelector('.start__button');
let sendButton = document.querySelector('.send__button');
let okButton = document.querySelector('.ok__icon');
let tryAgainButton = document.querySelector('.no__icon');
let notWorking = document.querySelector('#notWorking');
let quantityButton = document.querySelector('#quantityIcon');
let ingredientsButton = document.querySelector('#ingredientsIcon');
let tagsButton = document.querySelector('#tagsIcon');

firstBullet.addEventListener('click', () => {
    third.classList.add('d-none');
    second.classList.add('d-none');
    fourth.classList.add('d-none');
    fifth.classList.add('d-none');
    sixth.classList.add('d-none');
    first.classList.remove('d-none');
    document.querySelectorAll('.bullet__point').forEach(bullet => {
        bullet.classList.remove('bullet__active');
    })
    firstBullet.classList.add('bullet__active');
})
secondBullet.addEventListener('click', () => {
    first.classList.add('d-none');
    third.classList.add('d-none');
    fourth.classList.add('d-none');
    fifth.classList.add('d-none');
    sixth.classList.add('d-none');
    second.classList.remove('d-none');
    document.querySelectorAll('.bullet__point').forEach(bullet => {
        bullet.classList.remove('bullet__active');
    })
    secondBullet.classList.add('bullet__active');
})
thirdBullet.addEventListener('click', () => {
    first.classList.add('d-none');
    second.classList.add('d-none');
    fourth.classList.add('d-none');
    fifth.classList.add('d-none');
    sixth.classList.add('d-none');
    third.classList.remove('d-none');
    document.querySelectorAll('.bullet__point').forEach(bullet => {
        bullet.classList.remove('bullet__active');
    })
    thirdBullet.classList.add('bullet__active');
})
startButton.addEventListener('click', () => {
    first.classList.add('d-none');
    second.classList.add('d-none');
    third.classList.add('d-none');
    fifth.classList.add('d-none');
    sixth.classList.add('d-none');
    fourth.classList.remove('d-none');
    footer.classList.add('d-none');
    document.querySelectorAll('.bullet__point').forEach(bullet => {
        bullet.classList.add('d-none');
    })
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#camera')
        },
        decoder: {
            readers: ["code_128_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
})
Quagga.onDetected((data) => {
    console.log(data['codeResult']['code']);
    display.classList.remove('d-none');
    loading.classList.remove('d-none');
    Quagga.stop();
    setTimeout(() => {
        loading.classList.add('d-none');
        result.textContent = data['codeResult']['code'];
        resultContainer.classList.remove('d-none');
    }, 3000);

})
tryAgainButton.addEventListener('click', () => {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#camera')
        },
        decoder: {
            readers: ["code_128_reader", "ean_5_reader", "ean_8_reader", "ean_2_reader", "code_39_reader", "code_93_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
    setTimeout(() => {
        display.classList.add('d-none');
        loading.classList.add('d-none');
        resultContainer.classList.add('d-none');
    }, 3000);
})
okButton.addEventListener('click', () => {
    setTimeout(() => {
        display.classList.add('d-none');
        loading.classList.add('d-none');
        resultContainer.classList.add('d-none');
        code = result.innerHTML;
        first.classList.add('d-none');
        second.classList.add('d-none');
        third.classList.add('d-none');
        fourth.classList.add('d-none');
        fifth.classList.add('d-none');
        sixth.classList.remove('d-none');
        setTimeout(() => {
            sixth.classList.add('d-none');
        }, 3000);
    }, 1000);
})
notWorking.addEventListener('click', () => {
    first.classList.add('d-none');
    second.classList.add('d-none');
    third.classList.add('d-none');
    fourth.classList.add('d-none');
    fifth.classList.remove('d-none');
    sixth.classList.add('d-none');
    Quagga.stop();
})


// if ((codeInput.value == "") || (codeInput.value == undefined) || (codeInput.value == null)) {
//     sendButton.setAttribute('disabled', 'disabled');
//     console.log(codeInput.value);
// } else {
//     console.log(codeInput.value);
//     sendButton.removeAttribute('disabled');
// }

sendButton.addEventListener('click', () => {
    code = codeInput.value;
    first.classList.add('d-none');
    second.classList.add('d-none');
    third.classList.add('d-none');
    fourth.classList.add('d-none');
    fifth.classList.add('d-none');
    sixth.classList.remove('d-none');
    setTimeout(() => {
        sixth.classList.add('d-none');
        console.log(code)
        if ((code == "") || (code == undefined) || (code == null)) {
            fifth.classList.remove('d-none');
        } else {
            seventh.classList.remove('d-none');
            body.classList.remove('unScrollable');
            html.classList.remove('unScrollable');
            changeLink(code);
        }
    }, 3000);
})

quantityButton.addEventListener('click', () => {
    if (quantity2) {
        if (selectClicked == false) {
            quantitySelect.classList.remove('quantityTitle__closed');
            quantitySelect.classList.add('quantityTitle__opened');
            selectClicked = true;
            console.log(selectClicked);
        } else {
            quantitySelect.classList.add('quantityTitle__closed');
            quantitySelect.classList.remove('quantityTitle__opened');
            selectClicked = false;
            console.log(selectClicked);
        }
    } else {
        quantitySelect.classList.remove('quantityTitle__opened');
        quantitySelect.classList.add('quantityTitle__closed');
    }

})

quantity1.addEventListener('click', () => {
    if (firstQuantity == percent) {
        firstQuantity = percent;
        secondQuantity = servingQuantity;
    } else {
        firstQuantity = servingQuantity;
        secondQuantity = percent;
    }
    quantity1.textContent = firstQuantity;
    quantity2.textContent = secondQuantity;
    quantitySelect.classList.add('quantityTitle__closed');
    quantitySelect.classList.remove('quantityTitle__opened');
    selectClicked = false;
    for (let i = 0; i <= nutriments.length - 1; i++) {
        let output = document.querySelectorAll('#infoOutput');
        for (let j = 0; j <= output.length - 1; j++) {
            output[j].textContent = `${((nutriments[j].value) * (firstQuantity / 100)).toFixed(2)} ${nutriments[j].unit}`
        }
    }
    cardsContainer.scrollTo(0, 0);
})

quantity2.addEventListener('click', () => {
    if (secondQuantity == servingQuantity) {
        firstQuantity = servingQuantity;
        secondQuantity = percent;
    } else {
        firstQuantity = percent;
        secondQuantity = servingQuantity;
    }
    quantity1.textContent = firstQuantity;
    quantity2.textContent = secondQuantity;
    quantitySelect.classList.add('quantityTitle__closed');
    quantitySelect.classList.remove('quantityTitle__opened');
    selectClicked = false;
    for (let i = 0; i <= nutriments.length - 1; i++) {
        let output = document.querySelectorAll('#infoOutput');
        for (let j = 0; j <= output.length - 1; j++) {
            output[j].textContent = `${((nutriments[j].value) * (firstQuantity / 100)).toFixed(2)} ${nutriments[j].unit}`
        }
    }
    cardsContainer.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
})

ingredientsButton.addEventListener('click', () => {
    if (ingredientsClicked == false) {
        ingredientsSelect.classList.add('ingredientsSelect__closed');
        ingredientsSelect.classList.remove('ingredientsSelect__opened');
        ingredientsClicked = true;
    } else {
        ingredientsSelect.classList.remove('ingredientsSelect__closed');
        ingredientsSelect.classList.add('ingredientsSelect__opened');
        ingredientsClicked = false;
        main.scrollTo({
            top: 800,
            left: 0,
            behavior: "smooth"
        })
    }
})

tagsButton.addEventListener('click',()=>{
    if (tagsClicked == false) {
        tagsSelect.classList.add('tagsSelect__closed');
        tagsSelect.classList.remove('tagsSelect__opened');
        tagsClicked = true;
    } else {
        tagsSelect.classList.remove('tagsSelect__closed');
        tagsSelect.classList.add('tagsSelect__opened');
        tagsClicked = false;
        main.scrollTo({
            top: 800,
            left: 0,
            behavior: "smooth"
        })
    }
})



//8422904015553
//8436008521063