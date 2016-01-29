var flake = new Image();
var y = 0;
function init() {
    flake.src = "./snow_flake.png";
    window.requestAnimationFrame(draw);
}

function draw() {
    var canvas = document.getElementById("tutorial");
    var ctx = canvas.getContext("2d");


    ctx.clearRect(0, 0, 800, 450);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 800, 450);
    y += 1;
    if (y > canvas.height) {
        y = 0;
    }

    ctx.drawImage(flake, 388, y);

    window.requestAnimationFrame(draw);
}

init();
