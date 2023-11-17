"use strict"

function getCategory() {
    return (new URLSearchParams(window.location.search)).get("category");
}

function setCategoryName(name) {
    if (name) {
        document.title = name;
        document.body.querySelector("#products_section .part_name").innerHTML = name;
    }
}

function createProductDiv(product) {
    let div = document.createElement("div");
    div.className = "product_div";
    document.getElementById("products_div").appendChild(div);

    let img = document.createElement("img");
    img.src = "../../images/products/" + product["img"];
    img.className = "product_img";
    div.appendChild(img);


    let head = document.createElement("h3");
    head.innerHTML = product.name;
    head.style.gridArea = "head";
    div.appendChild(head);

    let cost = document.createElement("p");
    cost.innerHTML = product["cost"].toLocaleString() + " ₽";
    cost.className = "product_cost"
    div.appendChild(cost);

    let desc = document.createElement("p");
    desc.innerHTML = product.description;
    desc.style.gridArea = "desc";
    div.appendChild(desc);

    let buttonDiv = document.createElement("div");
    buttonDiv.className = "product_div_button";
    div.appendChild(buttonDiv);

    let buyButton = document.createElement("button");
    buyButton.innerHTML = "Купить";
    buyButton.className = "product_buy_button";
    buyButton.classList.add("arrow_button");
    // buyButton.style.display = "none";
    buyButton.appendChild(document.createElement("span"))
    buttonDiv.appendChild(buyButton);

    let subButton = document.createElement("button");
    subButton.innerHTML = "-";
    subButton.className = "arrow_button";
    subButton.classList.add("product_basket_button");
    subButton.style.display = "none";
    buttonDiv.appendChild(subButton);

    let basketButton = document.createElement("button");
    basketButton.innerHTML = "В корзине: 3 шт";
    basketButton.className = "arrow_button";
    basketButton.classList.add("product_basket_button");
    basketButton.style.width = "150px";
    basketButton.style.display = "none";
    basketButton.appendChild(document.createElement("span"));
    buttonDiv.appendChild(basketButton);

    let addButton = document.createElement("button");
    addButton.innerHTML = "+";
    addButton.className = "arrow_button";
    addButton.style.display = "none";
    addButton.classList.add("product_basket_button");
    buttonDiv.appendChild(addButton);

}

function findCategory(category) {
    return data.find(function (item) {
        return item.id === category;
    });
}

function setCategoryFilter(category) {
    document.getElementById(category + "_input").checked = true;
}

function addCategory(category) {
    let content = findCategory(category);
    setCategoryName(content.name);
    setCategoryFilter(content.id);
    for (let product of content["products"]) {
        createProductDiv(product);
    }
}

import data from '../../products_list/products.json' assert {type: 'json'};

let category = getCategory();
addCategory(category);

for (let input of document.querySelectorAll("#category_filter > div > input")) {
    input.onclick = function () {
        if (input.checked) {
            addCategory(input.id.split("_")[0]);
        } else {

        }
    }
}