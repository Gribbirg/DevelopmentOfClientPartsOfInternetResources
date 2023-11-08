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

function getRandomString(maxLen) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let counter = 0;
    while (counter < maxLen) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        counter += 1;
    }
    return result;
}

function GetRandomSumObject() {
    let first = Math.floor(Math.random() * 100);
    let second = Math.floor(Math.random() * 100);
    return {
        text: first.toString() + " + " + second.toString() + " = ",
        answer: first + second
    }
}

function CreateCaptcha() {
    return {
        state: 0,
        [Symbol.for("captcha_text")]: getRandomString(5),
        [Symbol.for("captcha_sum")]: new GetRandomSumObject(),
        form: document.getElementById("captcha"),
        hint: document.querySelector("#captcha > p"),
        input: document.getElementById("captcha_input"),
        check: function () {
            if (this.state === 0) {
                this.state++;
                this.setValue(this[Symbol.for("captcha_text")]);
                this.hint.innerHTML = "Введите текст ниже:";
                return;
            }
            let value = this.input.value;
            if (this.state === 1) {
                if (value === this[Symbol.for("captcha_text")]) {
                    this.close();
                } else {
                    this.state++;
                    alert(`wrong!\n${value}\n${this[Symbol.for("captcha_text")]}`)
                    this.setValue(this[Symbol.for("captcha_sum")].text);
                    this.hint.innerHTML = "Вычислите выражение:";
                }
            } else if (this.state === 2) {
                if (Number(value) === this[Symbol.for("captcha_sum")].answer) {
                    this.close();
                } else {
                    this.state = -1;
                    alert(`wrong!\n${value}\n${this[Symbol.for("captcha_sum")].answer}`)
                    this.setValue("Вы робот!");
                    this.input.blur();
                    this.hint.innerHTML = "Вы робот!";
                    this.form.style.pointerEvents = "none";
                    this.form.style.filter = "brightness(60%)";
                }
            }
        },
        setValue: function (labelText) {
            document.querySelector("& label[for=\"captcha_input\"]").innerHTML = labelText;
            this.input.value = "";
        },
        close: function () {
            this.state = -1;
            this.form.style.display = "none";
            document.getElementById("enter_form").style.display = "block";
            document.getElementById("reg_form").style.display = "block";
        }
    }
}

let captcha = CreateCaptcha();
captcha.check();

document.getElementById("captcha").onsubmit = function () {
    captcha.check();
}