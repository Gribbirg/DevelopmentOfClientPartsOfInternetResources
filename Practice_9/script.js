"use strict"

function authPrompt() {
    let name = prompt("Кто ты?");

    if (!name ?? name === "")
        alert("Отменено")
    else if (name === "Админ")
        passwordPrompt()
    else
        alert("Я вас не знаю")
}

function passwordPrompt() {
    let pass = prompt("Введите пароль");

    if (!pass ?? pass === "")
        alert("Отменено");
    else if (pass === "Я главный")
        alert("Здравствуйте!");
    else
        alert("Неверный пароль");
}


document.getElementById("reg_form").onsubmit = function () {
    let enter = document.getElementById("reg_ans").value;
    if (enter === "Да")
        document.getElementById("reg_ans_label").innerHTML = "Круто!";
    else if (enter === "Админ")
        authPrompt();
    else
        document.getElementById("reg_ans_label").innerHTML = "Попробуй ещё раз ";
}