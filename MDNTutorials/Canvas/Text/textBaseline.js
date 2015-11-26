function draw() {
    var ctx = document.getElementById("tutorial").getContext("2d");

    ctx.font = "48px serif";
    ctx.textBaseline = "hanging";
    ctx.strokeText("Hello World", 0, 100);
}
