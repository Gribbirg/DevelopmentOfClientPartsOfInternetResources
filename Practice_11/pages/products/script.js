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
    div.style.width = "100%";
    div.style.height = "200px";
    div.style.background = "#fcfdf6";
    // div.style.border = "#1a1c18 1px solid";
    div.style.borderRadius = "10px";
    div.style.boxShadow = "1px 1px 3px 2px grey";
    div.style.display = "grid";
    div.style.gridTemplate = "repeat(3, fit-content(100%)) / fit-content(100%) 1fr fit-content(100%)";
    div.style.gridTemplateAreas = '"pic head cost" "pic desc cost" "pic button button"'
    // div.style.justifyContent = "space-between";
    // div.style.alignItems = "center";
    document.getElementById("products_div").appendChild(div);

    let img = document.createElement("img");
    img.src = "../../images/products/" + product["img"];
    img.style.height = "180px";
    img.style.margin = "10px";
    img.style.gridArea = "pic";
    div.appendChild(img);

    // let textDiv = document.createElement("div");
    // textDiv.style.height = "100%";
    // textDiv.style.width = "100%";
    // textDiv.style.margin = "10px"
    // div.appendChild(textDiv);

    let head = document.createElement("h3");
    head.innerHTML = product.name;
    head.style.gridArea = "head";

    div.appendChild(head);

    let cost = document.createElement("p");
    cost.innerHTML = product["cost"].toLocaleString() + " ₽";
    cost.style.lineBreak = "none";
    cost.style.whiteSpace = "nowrap";
    cost.style.margin = "10px";
    cost.style.fontSize = "2rem";
    cost.style.gridArea = "cost";
    div.appendChild(cost);

    let desc = document.createElement("p");
    desc.innerHTML = product.description;
    desc.style.gridArea = "desc";
    div.appendChild(desc);

    let button = document.createElement("button");
    button.style.gridArea = "button";
    button.style.margin = "10px";
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