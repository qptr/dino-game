"use strict";

document.getElementById("start-button").addEventListener("click", game);
document.addEventListener("keydown", jump);

function jump(event) {
    const spacebar = 32;
    if (event.keyCode != spacebar) return;
    const dinosaur = document.getElementById("dinosaur");
    dinosaur.style.gridRow = 1;
    setTimeout(function () {
        dinosaur.style.gridRow = 2;
    }, 400)
}

function game() {
    document.getElementById("start-button").disabled = true;
    const cactus = document.getElementById("cactus");
    const cactus2 = document.getElementById("cactus-2");
    scrollCactus(cactus);
    setTimeout(function () {
        scrollCactus(cactus2);
    }, randomDelay());
}

function scrollCactus(cactus) {
    cactus.style.visibility = "visible";
    const position = setInterval(function () {
        if (window.getComputedStyle(cactus).gridColumn > 1) {
            cactus.style.gridColumn = window.getComputedStyle(cactus).gridColumn - 1;
        } else {
            cactus.style.gridColumn = 50;
            cactus.style.visibility = "collapse";
            clearInterval(position);
            setTimeout(function () {
                scrollCactus(cactus);
            }, randomDelay());
        }
    }, 100);
}

function randomDelay() {
    const min = 300;
    const max = 2000;
    return Math.floor(Math.random() * (max - min) + min);
  }
