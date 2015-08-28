function draw() {
    var ctx = document.getElementById("tutorial").getContext("2d");

    // Background
    ctx.fillStyle = "FD0";
    ctx.fillRect(0, 0, 75, 75);
    ctx.fillStyle = "#6C0";
    ctx.fillRect(75, 0, 75, 75);
    ctx.fillStyle = "#09F";
    ctx.fillRect(0, 75, 75, 75);
    
}
