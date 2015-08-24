function draw() {
    var canvas = document.getElementById("tutorial");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        
        // Filled triangle
        var ftriangle = new Path2D();
        ftriangle.moveTo(25, 25);   // Start point
        ftriangle.lineTo(105, 25);  // Top side
        ftriangle.lineTo(25, 105);  // Hypoteneuse
        ctx.fill(ftriangle);        // fill closes shape
        
        // Stroked triangle
        var striangle = new Path2D();
        striangle.moveTo(125, 125); // Start point
        striangle.lineTo(125, 45);  // Right side
        striangle.lineTo(45, 125);  // Hypoteneuse
        striangle.closePath();      // Manually close stroked shape
        ctx.stroke(striangle);
    }
}