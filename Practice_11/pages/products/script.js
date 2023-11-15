function getCategory() {
    return (new URLSearchParams(window.location.search)).get("category");
}

function setCategoryName(name) {
    document.title = name;
    document.body.querySelector("#products_section .part_name").innerHTML = name;
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