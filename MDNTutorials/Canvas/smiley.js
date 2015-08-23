function draw() {
    var canvas = document.getElementById("tutorial");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        
        var path = new Path2D();
        path.arc(75, 75, 50, 0, Math.PI*2, true); // Outer circle
        path.moveTo(110, 75);
        path.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
        path.moveTo(65, 65);
        path.arc(60, 65, 5, 0, Math.PI*2, true); // Left eye
        path.moveTo(95, 65);
        path.arc(90, 65, 5, 0, Math.PI*2, true); // Right eye
        ctx.stroke(path);
    }
}