document.addEventListener("keydown", jump);

function jump(event) {
    var spacebar = 32;
    if (event.keyCode != spacebar) return;
    const dinosaur = document.getElementById("dinosaur");
    dinosaur.style.gridRow = 1;
    setTimeout(function () {
        dinosaur.style.gridRow = 2;
    }, 200)
}
