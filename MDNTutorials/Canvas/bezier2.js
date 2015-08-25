// Heart <3

function draw() {
    var canvas = document.getElementById("tutorial");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        
        // Cubic bezier curves
        var path = new Path2D();
        path.moveTo(75, 40);
        path.bezierCurveTo(75, 37, 70, 25, 50, 25);
        path.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        path.bezierCurveTo(20, 80, 40, 102, 75, 120);
        path.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        path.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        path.bezierCurveTo(85, 25, 75, 37, 75, 40);         // Return to start
        ctx.fill(path);
    }
}