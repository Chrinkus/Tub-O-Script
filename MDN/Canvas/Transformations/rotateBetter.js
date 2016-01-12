function draw() {
    var ctx = document.getElementById("tutorial").getContext("2d");
    var blue = "#0095DD";
    var grey = "#4D4E53";

    function oneRect() {
        ctx.fillRect(30, 30, 100, 100);
    }

    // Left rectangles
    ctx.save();
    // blue rect
    ctx.fillStyle = blue;
    oneRect();
    ctx.rotate((Math.PI/180) * 25);
    // grey rect
    ctx.fillStyle = grey;
    oneRect();
    ctx.restore();

    // right rectangles, rotate from centre
    ctx. translate(120, 0);
    // blue rect
    ctx.fillStyle = blue;
    oneRect();
    // rotate around centre of rect
    ctx.translate(80, 80);
    ctx.rotate((Math.PI/180) * 25);
    ctx.translate(-80, -80); // is there a better way?
    // grey rect
    ctx.fillStyle = grey;
    oneRect();
}
