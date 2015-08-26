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
