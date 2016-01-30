function Flake(x) {
    this.flake = new Image();
    this.flake.src = "./snow_flake.png";
    this.x = x;
    this.y = -25;
}
var snow = [];
var density = 50;

function init() {
    for (var i = 0; i < density; i++) {
        snow[i] = new Flake(Math.floor(Math.random() * 775));
    }
    window.requestAnimationFrame(draw);
}

function draw(t) {
    var canvas = document.getElementById("tutorial");
    var ctx = canvas.getContext("2d");
    var timedRelease = t/1000;

    ctx.fillStyle = "#000";

    ctx.clearRect(0, 0, 800, 450);
    ctx.fillRect(0, 0, 800, 450);

    snow.forEach(function(entry, index) {
        if (index < timedRelease) {
            entry.y += 1;
            if (entry.y > 450) {
                entry.y = -25;
            }
            ctx.drawImage(entry.flake, entry.x, entry.y);
        }
    });
    window.requestAnimationFrame(draw);
}
