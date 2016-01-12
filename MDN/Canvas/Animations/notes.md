#Canvas Tutorial - Basic Animations
- since already using javascript to control our canvas its easy to add animations
- biggest limitation is that once a shape is drawn, it stays that way
    - to move, we redraw it AND everything drawn before it
        - it takes a lot of time to redraw complex frames, performance can be affected by speed of computer

###Basic animation steps
- to draw a frame
    1. Clear the Canvas
        - Unless the shapes fill the complete canvas (such as a backdrop), you need to clear the shapes previously drawn
            - use clearRect()
    2. Save the canvas state
        - If making changes to any setting (styles, transformations) you may want to save the original state for redrawing
    3. Draw animated shapes
        - actual rendering of frame
    4. Restore the canvas state
        - if state was saved, restore it before drawing new frame

###Controlling an animation
- shapes are drawn by using canvas methods directly or using custom functions
    - only see results on canvas when the script finishes executing
        - can't do an animation from within a ```for``` loop
    - need a way to execute our drawing functions over a period of time
####Scheduled updates
- there are ```window``` methods we can use to call a specific function over a period of time
    - setInterval(function, delay)
        - starts repeatedly executing the function specified every ```delay``` milliseconds
    - setTimeout(function, delay)
        - executes the function specified in ```delay``` milliseconds
    - requestAnimationFrame(callback)
        - tells browser you wish to perform an animation and requests that the browser call a specified function to update an animation before next repaint
- if you don't want user interaction you would use setInterval()
- if you want to make a game we could use setTimeout() and control the animation with keyboard or mouse inputs
    - by setting EventListeners we catch any user interaction and execute our animating functions

###An animated solar system
