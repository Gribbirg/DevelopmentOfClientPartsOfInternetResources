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

function betterNumber(num) {
    let ans = (String)(num % 1000);
    while (num > 0) {
        num = Math.floor(num / 1000);
        ans = (num % 1000) + " " + ans;
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

    let button = document.createElement("button");
    button.innerHTML = "Купить";
    button.className = "product_buy_button";
    button.classList.add("arrow_button");
    button.appendChild(document.createElement("span"))
    div.appendChild(button);
}

function GetContent(category) {
    let content = data.find(function (item) {
        return item.id === category;
    });
    setCategoryName(content.name);
    for (let product of content["products"]) {
        createProductDiv(product);
    }
}

let category = getCategory();

switch (category) {

}

import data from '../../products_list/products.json' assert {type: 'json'};

GetContent(category)