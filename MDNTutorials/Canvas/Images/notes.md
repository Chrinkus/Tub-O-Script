#Canvas Tutorial - Using Images
- 2 steps to import images into a canvas
    - Get a reference to an HTMLImageElement obj or another canvas element
    - Draw the image using the drawImage() function

###Getting images to draw
- HTMLImageElement
    - images created using the Image() constructor
    - any ```<img>``` element
- HTMLVideoElement
    - grabs the current frame from an HTML ```<video>``` source as an image
- HTMLCanvasElement
    - another ```<canvas>``` element
- These are collectively referred to by the type CanvasImageSource

####Using images from the same page
- we can access images on the same page as our canvas by using:
    - the document.images collection
    - the document.getElementsByTagName() method
    - the document.getElementById() method w/given ID
####Using images from other domains
- using the crossorigin attribute of an ```<img>``` element we can request permission to load an image from another domain
    - if permitted, the image can be used without tainting the canvas
    - **Tainted Canvas**
        - if a canvas has been tainted you can no longer pull data back out of the canvas
            - toBlob(), toDataURL(), or getImageData() use will throw a security error
            - protects users from having private data exposed via images
####Using other canvas elements
- similar to normal images we can access other canvas elements by their tag or ID
    - document.getElementsByTagName()
    - document.getElementById()
- be sure to draw something to source canvas before using it
- one practical use of this feature is as a thumbnail view

####Creating an image from scratch
- can also create a new HTMLImageElement via script
```javascript
var img = new Image();   // Create new img element
img.src = "myImage.png"; // Set source path
```
- When this script executes, the image starts loading
- If you try to call drawImage() before image has loaded it won't do anything or even throw an exception
    - use a load event
```javascript
var img = new Image();
img.addEventListener("load", function() {
    // execute drawImage statements here
}, false);
img.src = "myImage.png";
```
- this is acceptable for loading a single external image
    - if need to load more there are better solutions like pre-loading

####Embedding an image via data: URL
- we can also define an image as a Base64 encoded string of characters
```javascript
var img = new Image();
img.src = "data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==";
```
- the advantage of this is that the image is available immediately
    - we can also use this to encapsulate all of our CSS, JavaScript, HTML and images in a single file
- a disadvantage is that the image is not cached and the URL can become quite long for larger images

####Using frames from a video
- we can also use frames from a ```<video>``` element
```javascript
function getMyVideo() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        return document.getElementById("myVideo");
    }
}
```
- this returns the HTMLVideoElement obj for the video

###Drawing Images
- once we have a reference to a source image, we can render it with drawImage()
    - the drawImage() method is overloaded
- the basic form:
    - drawImage(image, x, y)
        - draws the CanvasImageSource specified by the image parameter at the coordinates (x, y)
- the example graph.js uses an external image as a backdrop for a small line graph

###Scaling
- the second variant of the drawImage() method lets us place a scaled image on the canvas
    - drawImage(image, x, y, width, height)
        - adds width and height parameters indicating the size to which the image is to be scaled to
- the example tiling.js uses an image as a wallpaper and repeats it several times on the canvas

###Slicing
- the third and last variant of drawImage() has eight parameters in addition to the source. Using these we can cut out a section of the source image, then scale and draw it
    - drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        - given an image, the first four parameters identify the source image within the image
            - the top corner is defined by (sx, sy)
            - the area to be spliced out is sWidth * sHeight
        - the last four parameters identify the destination and scaled size of the spliced image on the canvas
            - the location is defined by (dx, dy)
            - the new size is dWidth * dHeight
- the examples slicing.js/indexFrame.html load the images directly in the HTML and retrieves them from the page before slicing and displaying them
    - the inline CSS "display:none;" ensures the initial loading of the images are not visible

###Art Gallery
- the example set gallery.js, gallery.css, indexGallery.html display a table of images as individual canvases with frames applied to them
    - the stylesheet ensures none of the images display independently of their canvas representations
    - the loop creates a canvas element for each image, draws the image then adds a frame
    - in gallery.js the insertBefore() method places our newly created canvas into the DOM
        - the location (before the image represented by the canvas) seems to be the best option of anywhere else on the page

###Controlling Image Scaling Behaviour
- scaling images can result in unwanted effects (fuzzy, blocky)
    - we can turn off default image smoothing by accessing the imageSmoothingEnabled property which is set to true by default
        - can be turned off like this:
```javascript
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
```
