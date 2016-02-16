(function() {
    var canvas = document.getElementById("field");
    var ctx = canvas.getContext("2d");

    var keysDown = {};

    addEventListener("keydown", function(e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode];
    }, false);

    var x = 25;
    var y = 25;
    var speed = 128; // pixels/sec
    var then = 0;

    var update = function(modifier) {
        if (65 in keysDown) { x -= speed * modifier; }
        if (68 in keysDown) { x += speed * modifier; }
        if (87 in keysDown) { y -= speed * modifier; }
        if (83 in keysDown) { y += speed * modifier; }
    }

    function main(tStamp) {
        window.requestAnimationFrame(main);
        var now = Math.floor(tStamp) / 1000;
        var delta = now - then;

        update(delta);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, 50, 50);

        then = now;
    }
    main();
})();
