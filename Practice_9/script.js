"use strict"


document.getElementById("reg_form").onsubmit = function(){
    if (document.getElementById("reg_ans").value === "Да")
        document.getElementById("reg_ans_label").innerHTML = "Круто!";
    else
        document.getElementById("reg_ans_label").innerHTML = "Попробуй ещё раз ";
}

let promtRes = prompt('Кто ты?')

// if (promtRes === 'Админ')
//     alert("Ты легенда!")
// else
//     alert("Я легенда!")