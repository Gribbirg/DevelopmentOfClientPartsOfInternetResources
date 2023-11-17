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

function setContent(content) {
    document.getElementById("products_div").innerHTML = "";
    for (let product of content) {
        createProductDiv(product);
    }
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
    let list = [];
    let count = 0;
    let category;
    for (let input of document.querySelectorAll("#category_filter > div > input")) {
        if (input.checked) {
            category = findCategory(input.id.split("_")[0]);
            list.push.apply(list, category["products"]);
            count++;
        }
    }
    if (count === 1) {
        setCategoryName(category.name);
    } else {
        setCategoryName("Товары")
    }
    return list;
}

import data from '../../products_list/products.json' assert {type: 'json'};

let category = getCategory();
addCategory(category);
setCategoryFilter(category);

let content = findCategory(category)["products"];
setContent(content);

document.getElementById("confirm_filter_button").onclick = function () {
    content = addFilterCategories();

    let costFrom = Number(document.getElementById("from_cost_filter").value);
    let costTo = Number(document.getElementById("to_cost_filter").value);
    if (costFrom && costTo) {
        content = content.filter(function (item) {
            let cost = Number(item["cost"]);
            return (cost >= costFrom && cost <= costTo);
        });
    }
    setContent(content);
}