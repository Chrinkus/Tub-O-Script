// Speech balloon using quadratic curves

function draw() {
    var canvas = document.getElementById("tutorial");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        
        var path = new Path2D();
        path.moveTo(75, 25);
        path.quadraticCurveTo(25, 25, 25, 62.5);    // Top mid to left mid
        path.quadraticCurveTo(25, 100, 50, 100);    // Left mid to 
        path.quadraticCurveTo(50, 120, 30, 125);
        path.quadraticCurveTo(60, 120, 65, 100);
        path.quadraticCurveTo(125, 100, 125, 62.5);
        path.quadraticCurveTo(125, 25, 75, 25);
        ctx.stroke(path);
    }
}