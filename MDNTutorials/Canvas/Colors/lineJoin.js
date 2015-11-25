function draw() {
    ctx = document.getElementById("tutorial").getContext("2d");
    var lineJoin = ["round", "bevel", "miter"];
    ctx.lineWidth = 10;
    for (var i = 0, len = lineJoin.length; i < len; i++) {
        ctx.lineJoin = lineJoin[i];
        ctx.beginPath();
        ctx.moveTo(-5, 5 + i * 40);
        ctx.lineTo(35, 45 + i * 40);
        ctx.lineTo(75, 5 + i * 40);
        ctx.lineTo(115, 45 + i * 40);
        ctx.lineTo(155, 5 + i * 40);
        ctx.stroke();
    }
}
