#Canvas Tutorial - Advanced Animations
- after learning about basic animations we will now be looking closer at motion and adding some physics to our animations

###Drawing a Ball
- going to use a ball for animation studies
    - ball is an object with its own draw method
    - separate a variable "canvas" from the context for future reference
####Adding Velocity
- velocity properties are added to the ball object that incrementally change the x & y position of the ball every frame
- we also make sure to clear the canvas each frame with clearRect()
- animation is controlled by mousing over the canvas using event listeners
    - *target*.addEventListener(*type*, *listener[, useCapture]*);
        - type
            - a string representing the event type to listen for
        - listener
            - the object that receives a notification when an event of the specified type occurs (JavaScript function)
        - useCapture
            - research
####Boundaries
- without boundary collision testing the ball will leave the canvas
    - if x or y position of ball is outside of canvas we invert the direction of the velocity vector
####Acceleration
- to make motion more realistic we can add diminishing values to the ball's vector
    - adding example code causes ball to slowly sink out of canvas
####Trailing Effect
- replacing the clearRect method with a semi-transparent fillRect call causes a trailing effect
####Adding Mouse Control
- we can make the ball follow the mouse using the mousemove event
    - the click event releases the ball and lets it bounce again
