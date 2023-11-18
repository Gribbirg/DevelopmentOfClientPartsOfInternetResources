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
            <div class="product_img_div">
                <img src=${"../../images/products/" + product["img"]} alt=${product.name}/>
            </div>
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
    if (content.length !== 0) {
        for (let product of content) {
            createProductDiv(product);
        }
    } else {
        document.getElementById("products_div").innerHTML +=
            `
            <p>По заданным критериям ничего не найдено.</p>
            `;
    }
}

function findCategory(category) {
    return data.find(function (item) {
        return item.id === category;
    });
}

function addCategory(category) {
    let content = findCategory(category);
    setCategoryName(content.name);
    for (let product of content["products"]) {
        createProductDiv(product);
    }
}

function getFilterList(list, a, b) {
    return list.filter(function (item) {
        let cost = Number(item["cost"]);
        return (cost >= a && cost <= b);
    });
}

function offSortDivs(onDiv) {
    for (let div of document.querySelectorAll(".sort_divs")) {
        div.style.background = "#006877";
        if (div.id !== onDiv.id) {
            for (let input of document.querySelectorAll(`#${div.id} > div > input`)) {
                input.checked = false;
            }
        }
    }
}

function onIfOffDirInputs(div) {
    let list = document.querySelectorAll(`#${div.id} > div > input`);
    for (let input of list) {
        if (input.checked) return;
    }
    list[0].checked = true;
}

function sortContent(content, sortType, dir) {
    let mn;
    if (dir === "up") {
        mn = 1;
    } else {
        mn = -1;
    }
    content.sort(function (a, b) {
        if (a[sortType] > b[sortType]) return 1 * mn;
        if (a[sortType] === b[sortType]) return 0;
        if (a[sortType] < b[sortType]) return -1 * mn;
    });
}

function onSortDivClickListener(div) {
    offSortDivs(div);
    onIfOffDirInputs(div);
    div.style.background = "#026e00";
    for (let input of document.querySelectorAll(`#${div.id} > div > input`)) {
        if (input.checked) {
            sortContent(content, input.id.split("_")[0], input.id.split("_")[2]);
        }
    }
    setContent(content);
}

import data from '../../products_list/products.json' assert {type: 'json'};

let category = getCategory();
addCategory(category);

let content = findCategory(category)["products"];
onSortDivClickListener(document.getElementById("cost_sort"));
setContent(content);

document.getElementById("confirm_filter_button").onclick = function () {
    content = findCategory(category)["products"];

    let costFrom = Number(document.getElementById("from_cost_filter").value);
    let costTo = Number(document.getElementById("to_cost_filter").value);
    if (costFrom && costTo) {
        content = getFilterList(content, costFrom, costTo);
    }

    setContent(content);
}

for (let div of document.querySelectorAll(".sort_divs")) {
    div.onclick = function () {
        onSortDivClickListener(div);
    };
}