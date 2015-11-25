#Canvas Tutorial - Style and Colours

*for the purposes of consistency I will use the American spelling "color" for the remainder of this document*

###Colors
- to use colors other than the default black we can alter two properties
    - fillStyle = color
        - sets the style to be used when filling shapes
    - strokeStyle = color
        - sets the style for shapes' outlines
    - color is a string that can represent
        - a CSS color
        - a gradient object
        - a pattern object
- setting strokeStyle or fillStyle changes the default to the new color for all shapes drawn from then on
    - must reassign fillStyle or strokeStyle anytime you want a different color
- valid string examples:
```javascript
// all strings equate to orange
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255, 165, 0)";
ctx.fillStyle = "rgba(255, 165, 0, 1)";
```

###Transparency
- we can also draw semi-transparent shapes using:
    - globalAlpha property
    - assigning a semi-transparent color to the style
- globalAlpha = transparencyValue
    - Applies the specified transparency value to all future shapes drawn on the canvas. The value must b between 0.0 (fully transparent) to 1.0 (fully opaque).
    - by default, this value is set to 1.0
- globalAlpha is useful if you want all shapes on a canvas to be the same transparency
    - otherwise its better to set the transparencies individually
        - use rgba when setting style
            - the "a" is for alpha and carries a value in the range similar to globalAlpha (0.0 - 1.0)
```javascript
// Assigning transparent colors to stroke and fill style

ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
```

###Line Styles
- there are several properties for styling lines
    - lineWidth = value
        - Sets the width of lines drawn in the future
    - lineCap = type
        - Sets the appearance of the ends of lines
    - lineJoin = type
        - Sets the appearance of the "corners" where lines meet
    - mitreLimit = value
        - Establishes a limit on the miter when two lines join at a sharp angle, to let you control how thick the junction becomes
    - getLineDash()
        - Returns the current line dash pattern array containing an even number of non-negative numbers
    - setLineDash()
        - Sets the current line dash pattern
    - lineDashOffset = value
        - Specifies where to start a dash array on a line
####lineWidth
- values must be positive, default is set to 1.0
- defines the thickness of the stroke centered on the given path
    - due to coordinates not referencing actual pixels, care must be taken to ensure line crispness for horizontal and vertical lines
        - odd-number-width'd h&v lines have the center of the line on the pixel line, and the half-widths extend into a partial pixel on the edges causing a fuzzy edge
        - to combat fuzzy edges, use half-coordinates for paths
            - (3.5, 1) to (3.5, 5.5)
        - even width lines should be given odd integer paths
            - (3, 1) to (3, 5)
####lineCap
- determines how the ends of lines will be drawn, default is set to butt
    - butt
        - The ends of lines are squared off at the endpoints
    - round
        - The ends of lines are rounded
            - line extends by a semicircle with a radius of half the line width
    - square
        - The ends of lines are squared off by adding a box with an equal width and half the height of the line's thickness
####lineJoin
- determines how two connecting segments (of lines, arcs, or curves) are joined together, default is set to miter
    - round
        - rounds off the corners of a shape by filling an additional sector of disc centered at the common endpoint of connected segments. The radius is equal to the line width
    - bevel
        - Fills an additional triangular area between the common endpoint of connected segments and the separate outside rectangular corners of each segment
    - miter
        - connected segments are joined by extending their outside edges to connect at a single point filling in an additional lozenge-shaped area. Affected by the miterLimit property explained below
####miterLimit
- since two lines meeting at a sharp angle (<20 degrees) can have exponentially long miters, we can set the limit at which the miter gets cut to a bevel
- there's lots of math, something to look into if I ever have funny needle lines
####lineDash
- specify dash pattern for lines
    - setLineDash()
        - accepts an array of numbers that specifies distances to alternately draw a line and a gap
    - lineDashOffset
        - sets an offset where to start the pattern

###Gradients
- we can fill and stroke shapes using linear and radial gradients
    - create a CanvasGradient obj then assign this object to the fillStyle or strokeStyle properties
        - createLinearGradient(x1, y1, x2, y2)
            - creates a linear gradient object with a starting point of (x1, y1) and an end point of (x2, y2)
        - createRadialGradient(x1, y1, r1, x2, y2, r2)
            - creates a radial gradient. The parameters represent 2 circles, one centered at (x1, y1) w/ a radius r1 and the other with the others(2s)
```javascript
var lineargradient = ctx.createLinearGradient(0, 0, 150, 150);
var radialgradient = ctx.createRadialGradient(75, 75, 0, 75, 75, 100);
```
- once created, we can assign colors to it by using the addColorStop() method
    - gradient.addColorStop(position, color)
        - creates a new color stop on the gradient object. The position is a number between 0.0 and 1.0 and defines the relative position of the color in the gradient, and the color must be a string representing a CSS color.
    - You can add as many color stops to a gradient as you need
```javascript
var lineargradient = ctx.createLinearGradient(0, 0, 150, 150);
lineargradient.addColorStop(0, "white");
lineargradient.addColorStop(1, "black");
```
