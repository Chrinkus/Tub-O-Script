/* A simple main loop
window.main = function() {
    window.requestAnimationFrame(main);

    // Whatever main loop needs to do
};

main(); // Start the cycle*/

// A better main loop
(function () {
    function main() {
        window.requestAnimationFrame(main);

        // Whatever main loop needs to do
    }

    main();
})();
