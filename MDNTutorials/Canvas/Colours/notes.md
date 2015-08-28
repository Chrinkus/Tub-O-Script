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
