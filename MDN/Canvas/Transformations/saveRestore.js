function draw() {
    var ctx = document.getElementById("tutorial").getContext("2d");

    ctx.fillRect(0, 0, 150, 150);   // Draw a rectangle w/default settings
    ctx.save();                     // Save the default state

    ctx.fillStyle = "#09F";         // Make changes to the settings
    ctx.fillRect(15, 15, 120, 120); // Draw a rectangle with new settings
    ctx.save();                     // Save the current state

    ctx.fillStyle = "#FFF";         // Make changes to the settings
    ctx.globalAlpha = 0.5;          // Make this layer semi-transparent
    ctx.fillRect(30, 30, 90, 90);   // Draw a rectangle with new settings

    ctx.restore();                  // Restore most recent saved state
    ctx.fillRect(45, 45, 60, 60);

    ctx.restore();                  // Restore original settings
    ctx.fillRect(60, 60, 30, 30);   // Draw a rectangle with original settings
}
