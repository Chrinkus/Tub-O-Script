#Canvas Tutorial - Style and Colors

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

###Patterns
- previously we have used loops to create patterns of images, we can easily do so instead using the createPattern() method
    - createPattern(image, type)
        - creates and returns a new canvas pattern obj
            - image - a CanvasImageSource(HTMLImageElement, another canvas, video, etc)
            - type - string indicating how to use the image
- type options
    - repeat
        - Tiles the image in both vertical and horizontal directions
    - repeat-x
        - Tiles the image horizontally
    - repeat-y
        - Tiles the image vertically
    - no-repeat
        - Doesn't tile the image, used only once
- similar to the gradient methods, we create a pattern obj then assign it to fillStyle or strokeStyle
```javascript
var img = new Image();
img.source = "someimage.png";
var ptrn = ctx.createPattern(img, "repeat");
```
- we use the image's ```onload``` handler to ensure the image is loaded before assigning it to a pattern

###Shadows
- there are four properties involved in the use of Shadows
    - shadowOffsetX = float
        - indicates the horizontal distance the shadow should extend from the object. NOT affected by transformation matrix. Default = 0.
    - shadowOffsetY = float
        - indicates the vertical distance the shadow should extend from the object. NOT affected by transformation matrix. Default = 0.
    - shadowBlur = float
        - indicates the size of the blurring effect, value does not correspond to a number of pixels and is not affected by the transformation matrix. The default value is 0.
    - shadowColor = color
        - a standard CSS color value indicating the color of the shadow effect, by default it is fully-transparent black
- for the float values in shadow offsets use negative values to extend up or left, and positive values for down and right. Both 0 by default.

###Canvas fill rules
- when using fill, clip, or isPointinPath you can optionally provide a fill rule algorithm to determine which sections get filled or not
    - Two possible values
        - "nonzero": default. https://en.wikipedia.org/wiki/Nonzero-rule
        - "evenodd": https://en.wikipedia.org/wiki/Even%E2%80%93odd_rule
- read up on these if having fill issues
