#Canvas Tutorial - Transformations
- transformations provide us with powerful ways to
    - translate the origin to a different position
    - rotate the grid
    - scale the grid

###Saving and restoring state
- two indispensable methods for complex drawings
    - save()
        - saves the entire state of the canvas to the stack
    - restore()
        - restores the most recently saved canvas state
- drawing states consist of
    - any transformations that have ben applied (translate, rotate, & scale)
    - the current values of the following attibutes
        - strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, mitreLimit, lineDashOffset, shadowOffsetX, globalCompositeOperation, font, textAlign, textBaseline, direction, imageSmoothingEnabled
    - the current clipping path (next tutorial)
- save() can be called as often as we like
    - restore() will retrieve the last saved state from the top of the stack

####A save and restore example
- the example saveRestore.js demonstrates how the stack of drawing states works
    - first a large black(default) rectangle is drawn and original state is saved
    - second a smaller blue rectangle is drawn and state is saved again
    - then we draw a smaller white semi-transparent rectangle
    - by calling restore now, the settings from step 2 are retrieved and we draw a smaller rectangle with them
        - we did not need to manually reset colour and transparency
    - finally, the second restore call returns us to the default state for our last rectangle

###Translating
- the first transformation method we will look at is translate()
    - translate(x, y)
        - Moves the canvas and its origin on the grid
        - x and y represent the distance to move along each axis
- its a good idea to save the canvas state before doing any transformations as restore is easier to call than reversing previous transformations manually
    - also be careful not to translate out of the canvas edge

####A translate example
- the example translate.js demonstrates some benefits to using the translate method
    - all rectangles are drawn at location (0, 0)
        - without translating the origin they'd all be drawn on top of each other
        - by translating the origin, drawing a (0, 0) object, then restoring we don't need to continually recalculate the distance to move the pen or recalculate fillRect location

###Rotating
- the second transformation method is rotate()
    - rotate(angle)
        - rotates the canvas clockwise around the current origin by the "angle" number of radians
- the rotation centre-point is always the canvas origin
    - to change centre-point we must use translate()

####A rotate example
- the example rotate.js demonstrates different ways to use the rotate method
    - a blue rectangle is drawn then the canvas is rotated 25 degrees and a grey rectangle is overlaid
    - then, next to that, another blue rectangle is drawn then the origin is moved to the centre of that rectangle and the canvas is rotated 25 degrees
    - a final grey rectangle is then drawn
- this example seems to be coded inefficiently with much repetition and extra work that translate() could have been used to eliminate

###Scaling
- the next method is scale()
    - scale(x, y)
        - scales the canvas by x horizontally and y vertically
            - both are real numbers
            - less than 1.0 reduces the size
            - 1.0 is the same size
            - greater than 1.0 increase the size
- using negative numbers allows axis mirroring
    - using translate(0, canvas.height); scale(1, -1); creates the Cartesian coordinate system with the origin at bottom left corner
- a scaling factor of 0.5 reduces canvas elements to half size, 2.0 doubles the size

####A scale example
