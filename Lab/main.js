// Button magic!
function createButton(pEle, f, text) {
	"use strict";
	var button = document.createElement("input");
	button.type = "button";
	button.value = text;
	button.onclick = f;
	pEle.appendChild(button);
}

(function () {
	"use strict";
	var canvas = document.getElementById("field");
	var ctx = canvas.getContext("2d");
	var text = "Here we go..";
	var msCount = 0;
	
	createButton(document.body, function() {
		ctx.fillStyle = "#09F";
		text = "Make it blue!";
	}, "Blue");
	createButton(document.body, function() {
		ctx.fillStyle = "#930";
		text = "Make it brown!";
	}, "Brown");
	createButton(document.body, function() {
		ctx.fillStyle = "#0F0";
		text = "Make it green!";
	}, "Green");
	
	function main(tStamp) {
		window.requestAnimationFrame(main);
		var timeStamp = new Date();
		msCount = timeStamp.getMilliseconds() % 1000;

		// Dancing fire
		var flicker = ((msCount / 1000 * 60) + 60);
		var lingrad = ctx.createLinearGradient(0, flicker, 0, 450);
		lingrad.addColorStop(0.4, ctx.fillStyle);
		lingrad.addColorStop(0.8, "#FF0");
		lingrad.addColorStop(1, "#F00");

		// Beginning of loop
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Paint background
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.fillStyle = lingrad;
		ctx.fillRect(0, 0, 800, 450);
		ctx.restore();

		// Print text
		ctx.save();
		ctx.fillStyle = "#FFF";
		ctx.font = "24px sans-serif";
		ctx.fillText((text + msCount), 25, 25);
		ctx.restore();
	}
	main();
})();
