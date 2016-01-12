function draw() {
    var ctx = document.getElementById("tutorial").getContext("2d");

    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

    ctx.font = "20px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText("Sample String", 5, 30);
}
