document.getElementById("start-button").addEventListener("click", gameCourse);
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

function gameCourse() {
    document.getElementById("start-button").disabled = true;
    const cactus = document.getElementById("cactus");
    setInterval(function () {
        if (window.getComputedStyle(cactus).gridColumn > 1) {
            cactus.style.gridColumn = window.getComputedStyle(cactus).gridColumn - 1;
        } else {
            cactus.style.gridColumn = 50;
        }
    }, 200)
}
