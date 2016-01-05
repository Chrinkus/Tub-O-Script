function draw() {
    var ctx = document.getElemenById("tutorial").getContext("2d");

    // Draw slice
    ctx.drawImage(document.getElementById("source"), 33, 71, 104, 124, 21, 20, 87, 104);

    // Draw frame
    ctx.drawImage(document.getElementById("frame"), 0, 0);
}
