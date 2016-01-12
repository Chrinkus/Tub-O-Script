function draw() {
    var canvas = document.getElementById("tutorial");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        
        var rectangle = new Path2D();
        rectangle.rect(10, 10, 50, 50);
        
        var circle = new Path2D();
        circle.moveTo(125, 35);
        circle.arc(100, 35, 25, 0, Math.PI * 2);
        
        ctx.stroke(rectangle);
        ctx.fill(circle);
    }
}