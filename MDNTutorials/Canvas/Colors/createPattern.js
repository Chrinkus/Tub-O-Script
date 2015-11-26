function draw() {
    var ctx = document.getElementById("tutorial").getContext("2d");

    // create new image object to use as a pattern
    var img = new Image();
    img.src = "https://mdn.mozillademos.org/files/222/Canvas_createpattern.png";
    img.onload = function() {

        //create pattern
        var ptrn = ctx.createPattern(img, "repeat");
        ctx.fillStyle = ptrn;
        ctx.fillRect(0, 0, 150, 150);
    }
}
