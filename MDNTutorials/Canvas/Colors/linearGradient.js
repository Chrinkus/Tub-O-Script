function draw() {
    var ctx = document.getElementById("tutorial").getContext("2d");

    // Create gradients
    var lingrad = ctx.createLinearGradient(0, 0, 0, 150);
    lingrad.addColorStop(0, "#00abeb");     // blue to...
    lingrad.addColorStop(0.5, "#fff");      // white then..
    lingrad.addColorStop(0.5, "#26c000");   // green to..
    lingrad.addColorStop(1, "#fff");        // white

    var lingrad2 = ctx.createLinearGradient(0, 50, 0, 95);
    // began color assignment at 0.5 which defaults 0.0 - 0.5 as same color, no grad
    lingrad2.addColorStop(0.5, "#000");
    lingrad2.addColorStop(1, "rgba(0, 0, 0, 0)");

    // assign gradients to fill and stroke styles
    ctx.fillStyle = lingrad;
    ctx.strokeStyle = lingrad2;

    // draw shapes
    ctx.fillRect(10, 10, 130, 130);
    ctx.strokeRect(50, 50, 50, 50);
}
