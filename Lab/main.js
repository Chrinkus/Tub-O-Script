(function () {
	var canvas = document.getElementById("field");
	var ctx = canvas.getContext("2d");
	var text = "Here we go..";
	
	// Button magic!
	function createButton(pEle, f, text) {
		var button = document.createElement("input");
		button.type = "button";
		button.value = text;
		button.onclick = f;
		pEle.appendChild(button);
	}
	createButton(document.body, function() {
		ctx.fillStyle = "#00F";
		text = "Make it blue!";
	}, "Blue");
	createButton(document.body, function() {
		ctx.fillStyle = "#F00";
		text = "Make it red!";
	}, "Red");
	createButton(document.body, function() {
		ctx.fillStyle = "#0F0";
		text = "Make it green!";
	}, "Green");

	function main() {
		window.requestAnimationFrame(main);

		// Beginning of loop
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Paint background
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Print text
		ctx.save();
		ctx.fillStyle = "#FFF";
		ctx.font = "24px sans-serif";
		ctx.fillText(text, 25, 25);
		ctx.restore();
	}
	main();
})();
