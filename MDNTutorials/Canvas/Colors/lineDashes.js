var canvas = document.getElementById("tutorial");
var ctx = canvas.getContext("2d");
var offset = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([4, 2]);
    ctx.lineDashOffset = -offset;
    ctx.strokeRect(10, 10, 100, 100);
}

function march() {
    offset++;
    if (offset > 16) {
        offset = 0;
    }
    draw();
    setTimeout(march, 20);
}

march();

// This doesn't work
