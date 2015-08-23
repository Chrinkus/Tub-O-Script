function draw() {
    var canvas = document.getElementById("tutorial");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        
        var path = new Path2D();
        path.moveTo(75, 50);
        path.lineTo(100, 75);
        path.lineTo(100, 25);
        ctx.fill(path);
    }
}