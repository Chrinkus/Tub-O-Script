#Canvas Tutorial

- First introduced in WebKit by Apple for the OS X Dashboard
- Today all major browsers support it
- Default size of the canvas is 300 px * 150 px (width*height)
- to draw graphics we use a JavaScript context object to create on the fly

###The <canvas> Element
```html
<canvas id="tutorial" width="150" height="150"></canvas>
```
- when no styling rules are applied to the canvas it will be initially fully transparent

####Fallback Content
- for older browsers we can provide alternative content to be displayed if they can't process a canvas
    - place fallback content between the tags
- Due to this feature, it is important to always provide a closing tag to canvas elements

###The Rendering Context
- the canvas element creates a fixed size drawing surface that exposes one or more rendering contexts
    - we will be using a 2D context but others exist
        - WebGL uses a 3d context
- the canvas is initially blank
    - to display something, script needs to access the rendering context and draw on it
    - the canvas element has a getContext() method that obtains the context and its drawing functions
        - takes the type of context as a parameter

####Checking for Support
- fallback content can be provided for with scripts as well using an if construct

###The Grid
- coordinate space
    - example html skeleton had a space 150 pixels square
    - normally one unit in the grid corresponds to one pixel on the canvas
        - the origin (0,0) of this grid is positioned in the top left

###Drawing Rectangles
- canvas only supports one primitive shape: rectangles
    - all other shapes must be constructed
- we use path drawing functions to draw shapes
    - fillRect(x, y, width, height)
        - Draws a filled rectangle
    - strokeRect(x, y, width, height)
        - Draws a rectangle outline
    - clearRect(x, y, width, height)
        - Clears the specified rectangular area, making it transparent
- each of the functions take the same parameters
    - x and y specify the position of the top left corner of the triangle relative to the origin
    - width and height provide the size

###Drawing Paths
- the only other primitive shapes are paths
- a path is a list of points connected by segments of lines that can be different shapes, curved or not, of different widths or colours
- a path or sub path can be closed
- to create shapes using paths
    1. create the path
    2. use drawing commands to draw into the path
    3. close the path
    4. stroke or fill the path to render it
- path functions
    - beginPath()
        - Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up
    - closePath()
        - Closes the path so that future drawing commands are directed to the context again
    - stroke()
        - Draws the shape by stroking its outline
    - fill()
        - draws a solid shape by filling the path's content area
- **tutorial note**
    - tutorial suggests using beginPath() to start a new path but examples show paths being created with a ```new Path2D``` constructor call
- when current path is empty, such as immediately after creating one, the first command is always treated as a moveTo() regardless of what it actually is
- calling closePath() is optional
    - closePath attempts to close the shape by drawing a straight line from current point back to the start
    - if path consists of only a single point closePath does nothing
- calling fill() automatically closes open shapes
    - stroke() does not

###Moving the Pen
- the moveTo() function acts as lifting the pen off the page
    - moveTo(x, y)
        - Moves the pen to the coordinates specified by x and y

####Lines
- to draw a straight line we use
    - lineTo(x, y)
        - Draws a line from the current drawing position to the position specified by x and y
        - the x and y are the end points of the line, start point is dependent on previous path end point

####Arcs
- to draw arcs we use the acr() or arcTo() methods
    - arc(x, y, radius, startAngle, endAngle, anticlockwise)
        - x, y is center
        - startAngle is point @ radius away from center to start
        - endAngle is point along arc to stop drawing
        - anticlockwise boolean setting
            - false defaults to clockwise
    - arcTo(x1, y1, x2, y2, radius)
        - Draws an arc with the given control points and radius, connected to the previous point by a straight line
- radians are used to measure angles
    - 1 radian is an arc length equal to the radius of the circle
        - a half circle is equal to PI rads
        - a full circle is equal to 2*PI rads
- the origin of a circle is at the 3 o'clock position

####Bezier and Quadratic Curves
- bezier curves are available in cubic and quadratic types (**correct?**)
    - quadraticCurveTo(cp1x, cp1y, x, y)
        - draws a quadratic curve from current pen position to (x, y) endoint using control point (cp1x, cp1y)
    - bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        - draws a cubic bezier curve from current pos to (x, y) using 2 control points