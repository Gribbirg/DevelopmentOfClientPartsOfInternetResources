"use strict"

function getCategory() {
    return (new URLSearchParams(window.location.search)).get("category");
}

function setCategoryName(name) {
    document.title = name;
    document.body.querySelector("#products_section .part_name").innerHTML = name;
}

function createProductDiv(product) {

}

function GetContent(category) {
    let content = data.find(function (item) {
        return item.id === category;
    });

}

let category = getCategory();

switch (category) {
    case "chemistry":
        setCategoryName("Масло и автохимия");
        break;
    case "tiers":
        setCategoryName("Шины и диски");
        break;
    case "electronics":
        setCategoryName("Автоэлектроника");
        break;
    case "other":
        setCategoryName("Остальное");
        break;
}

import data from './products.json' assert {type: 'json'};
GetContent(category)