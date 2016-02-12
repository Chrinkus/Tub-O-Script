(function() {
    "use strict";
    var canvas = document.getElementById("field");
    var ctx = canvas.getContext("2d");
    var ref = 0;
    var counter = 0;
    var redX = 25;
    var greenX = 25;
    var blueX = 25;

    function varSpd(hRMilli) {
        var speed = 0;
        if (hRMilli < 250) { speed = 1; } else
        if (hRMilli < 500) { speed = 2; } else
        if (hRMilli < 750) { speed = 3; } else
        if (hRMilli < 1000) { speed = 2; }
        return speed;
    }

    function longInterval(fiveSec) {

    }

    function main(hRTime) {
        window.requestAnimationFrame(main);
        var hRSeconds = Math.floor(hRTime / 1000);
        var hRMilli = Math.floor(hRTime) % 1000;
        var diff = hRSeconds - ref;
        if (diff <= 1 && counter < 49) { counter += diff; }
        ref = hRSeconds;
        //var loopStamp = new Date();
        //var sLoop = loopStamp.getSeconds();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Moving square constant speed
        redX += 1;
        if (redX > canvas.width) { redX = 0; }
        ctx.fillStyle = "#F00";
        ctx.fillRect(redX, 125, 48, 48);

        // Variable speed square
        greenX += varSpd(hRMilli);
        if (greenX > canvas.width) { greenX = 0; }
        ctx.fillStyle = "#0F0";
        ctx.fillRect(greenX, 200, 48, 48);

        ctx.fillStyle = "#FFF";
        ctx.font = "24px serif"; // Why not..?
        ctx.fillText(hRTime, 25, 25);       // 40696.593112999995
        ctx.fillText(hRSeconds, 25, 50);      // running seconds since tab opens 0-forever
        ctx.fillText(hRMilli, 25, 75);    // Sun Feb 07 2016 11:27:37 GMT-0600 (CST)
        ctx.fillText(fiveSec, 25, 100);       // time seconds 0-59
    }
    main();
})();
