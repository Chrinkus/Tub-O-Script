function draw() {

    // Loop through the images on the page
    for ( var i = 0; i < document.images.length; i++) {

        // Don't add a canvas for the frame image
        if (document.images[i].getAttribute("id") != "frame") {

            // Create canvas element
            var canvas = document.createElement("canvas");
            canvas.setAttribute("width", 132);
            canvas.setAttribute("height", 150);

            // Insert before the image
            document.images[i].parentNode.insertBefore(canvas, document.images[i]);

            var ctx = canvas.getContext("2d");

            // Draw image to canvas
            ctx.drawImage(document.images[i], 15, 20);

            // Add frames
            ctx.drawImage(document.getElementById("frame"), 0, 0);
        }
    }
}
