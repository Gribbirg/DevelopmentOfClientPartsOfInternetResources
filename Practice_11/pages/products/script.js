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

    document.getElementById("products_div").innerHTML +=
        `<div class="product_div">
            <img src=${"../../images/products/" + product["img"]} alt=${product.name} class="product_img"/>
            <h3 class="product_head">${product.name}</h3>
            <p class="product_desc">${product.description}</p>
            <p class="product_cost">${product["cost"].toLocaleString() + " ₽"}</p>
            <div class="product_div_button">
                <button class="product_buy_button arrow_button">
                    Купить
                    <span></span>
                </button>
                <button class="product_basket_button arrow_button">-</button>
                <button class="product_basket_button arrow_button" style="width: 150px">
                    В корзине 3 шт
                    <span></span>
                </button>
                <button class="product_basket_button arrow_button">+</button>
            </div>
        </div>`;
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
    for (let product of content["products"]) {
        createProductDiv(product);
    }
}

function addFilterCategories() {
    let count = 0;
    for (let input of document.querySelectorAll("#category_filter > div > input")) {
        if (input.checked) {
            addCategory(input.id.split("_")[0]);
            count++;
        }
    }
    if (count !== 1) {
        setCategoryName("Товары");
    }
}

import data from '../../products_list/products.json' assert {type: 'json'};

let category = getCategory();
addCategory(category);
setCategoryFilter(category);

document.getElementById("confirm_filter_button").onclick = function () {
    document.getElementById("products_div").innerHTML = "";
    addFilterCategories();
}