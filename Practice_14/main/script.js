'use strict'

for (let p of document.querySelectorAll("#blur_card_div > div > p, #anim_line_div > div > div > p, #glassmorphism_cards_div > div > div > p")) {
    p.innerHTML = truncate(p.innerHTML, 170);
}

function truncate(str, maxlength) {
    return (str.length <= maxlength) ? str : str.slice(0, maxlength - 3) + "...";
}

let slider_position = document.getElementById("slider_position_div")

slider_position.onmousedown = function (event) {
    event.preventDefault();

    let shiftX = event.clientX - slider_position.getBoundingClientRect().left;

    function move(event) {
        let position = event.clientX - shiftX - document.getElementById("slider_div").getBoundingClientRect().left;

        if (position < 0) {
            position = 0;
        }
        if (position > 300 - slider_position.offsetWidth) {
            position = 300 - slider_position.offsetWidth;
        }

        slider_position.style.left = position + 'px';
    }

    function stop() {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', stop);
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
}


slider_position.ondragstart = function() {
    return false;
};