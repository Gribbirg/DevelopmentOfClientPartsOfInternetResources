"use strict"

function authPrompt() {
    let name = prompt("Кто ты?");

    if (!name)
        alert("Отменено")
    else if (name === "Админ")
        passwordPrompt()
    else
        alert("Я вас не знаю")
}

function passwordPrompt() {
    let pass = prompt("Введите пароль");

    if (!pass)
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

function heartButtonOnClickEvent(button) {
    if (button.style.color === "black") {
        button.style.backgroundColor = "#ffdad6";
        button.style.color = "#ba1a1a";
        button.style.setProperty("--color", "#ba1a1a");
        startSpawnHearts();
    } else {
        button.style.backgroundColor = "white";
        button.style.color = "black";
        button.style.setProperty("--color", "black");
    }
}

function startSpawnHearts() {
    window.onmousemove = e => spawnHeart(e);
    spawnHearts = false;
    window.onclick = checkHeartsNeeded;
}

function spawnHeart(e) {
    let heart = document.createElement("a");

    heart.style.position = 'absolute';
    heart.style.left = e.pageX.toString() + "px";
    heart.style.top = e.pageY.toString() + "px";
    heart.innerHTML = "❤";
    heart.style.zIndex = "7";
    heart.style.color = "#03c700"
    heart.style.pointerEvents = "none"

    document.body.appendChild(heart);

}

function checkHeartsNeeded() {
    if (!spawnHearts) {
        spawnHearts = true;
    } else {
        window.onmousemove = null;
        spawnHearts = false;
        window.onclick = null;
    }
}

let spawnHearts = false;

for (let button of document.querySelectorAll('#pic_div > div > button')) {
    button.style.color = "black";
    button.onclick = function () {
        heartButtonOnClickEvent(button);
    }
}

