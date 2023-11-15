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

}

function GetContent(category) {
    let content = data.find(function (item) {
        return item.id === category;
    });
    setCategoryName(content.name);
    alert(content.name);
}

let category = getCategory();

switch (category) {

}

import data from '../../products_list/products.json' assert {type: 'json'};
GetContent(category)