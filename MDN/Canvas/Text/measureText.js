function draw() {
    var ctx = document.getElementById("tutorial").getContext("2d");
    ctx.font = "48px sans-serif";
    var text = ctx.measureText("foo"); // TextMetrics object
    ctx.fillText(text.width, 25, 100); // 66.7265625
}
