/* A simple main loop
window.main = function() {
    window.requestAnimationFrame(main);

    // Whatever main loop needs to do
};

main(); // Start the cycle*/

/* A better main loop
// Assumes MyGame was previously defined
(function () {
    function main() {
        MyGame.stopMain = window.requestAnimationFrame(main);

        // Whatever main loop needs to do
        // At any point we can stop the main loop using our stopMain token with:
        // window.cancelAnimationFrame(MyGame.stopMain);
    }

    main();
})();*/

/* A more optimized main loop
(function() {
    function main(tFrame) {
        MyGame.stopMain = window.requestAnimationFrame(main);

        // Whatever main loop needs to do
        // tFrame is now a DOMHighResTimeStamp provided by rAF
    }

    main(); // start the cycle
})();*/

// What most browser games should look like
(function() {
    function main(tFrame) {
        MyGame.stopMain = window.requestAnimationFrame(main);

        update(tFrame); // Call your update method. We pass it tFrame
        render();
    }

    main(); // Start cycle
})();
