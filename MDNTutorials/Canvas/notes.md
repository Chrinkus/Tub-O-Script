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
