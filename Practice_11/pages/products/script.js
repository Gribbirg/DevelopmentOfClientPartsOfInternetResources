function getCategory() {
    return (new URLSearchParams(window.location.search)).get("category");
}

let category = getCategory();

switch (category) {
    case "chemistry":
        document.title = "Масло и автохимия";
        break;
    case "tiers":
        document.title = "Шины и диски";
        break;
    case "electronics":
        document.title = "Автоэлектроника";
        break;
    case "other":
        document.title = "Остальное";
        break;
}