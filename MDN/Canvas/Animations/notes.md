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
- the example solar.js produces an animated picture of the earth orbiting the sun with a moon orbiting the earth
    - this example makes use of many of the previous methods and techniques while introducing a few new ones
        - 3 images are imported from mozillademos
            - a 300px*300px starfield with a sun in the middle
            - a 12px radius earth
            - a 3.5px radius moon
        - the globalCompositeOperation is set to "destination-over" allowing us to paint new objects underneath existing content
            - render order is the earth, moon, earth orbit path, and sun
        - initial context is saved then origin is translated to canvas centre and canvas grid is rotated by referencing time
            - as canvas is rotated, earth is rendered 105px "out" from centre along the x-axis
                - a transparent "shadow" is rendered outside the orbit
                - the earth is then rendered
            - canvas is saved again before rotating context (currently with origin centred on earth) referencing time again
                - origin is then translated to a location along the moons orbit to render moon
                - 2 context restores bring our origin back to original position to draw earth orbit and finally lay down the sun backdrop
    - an initialize function is defined to retrieve the images and call the first requestAnimationFrame on draw()
        - as per design, the last line of draw() calls the next requestAnimationFrame and the code loops producing animation

###An animated clock
