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

    div.style.width = "100%";
    div.style.height = "100px";
    div.style.background = "#000000"

    document.getElementById("products_div").appendChild(div);
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