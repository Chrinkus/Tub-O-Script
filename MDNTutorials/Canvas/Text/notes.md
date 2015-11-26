#Canvas Tutorial - Drawing Text
- The canvas rendering context has two methods to render text
    - filText(text, x, y, [,maxWidth])
        - fills a given text at the given x,y position. Optionally with a maximum width to draw
    - strokeText(text, x, y, [,maxWidth])
        - strokes a given text at the given x,y position. Optionally with a maximum width to draw

###Styling Text
- along with the font property we can adjust the display of text in other ways
    - font = value
        - current text style being used. Uses the same syntax as the CSS font property. Default setting is 10px sans-serif
    - textAlign = value
        - possible values are: start, end, left, right, or center. Default is set to start
    - textBaseline = value
        - possible values are: top, hanging, middle, alphabetic, ideographic, bottom. Default is set to alphabetic.
    - direction = value
        - possible values are: ltr, rtl, inherit. Default is set to inherit.
- There is a diagram on the tutorial page that displays the different meanings of the baseline values

###Advanced text measurements
- more details are available from the following method
    - measureText()
        - returns a TextMetrics obj containing the width, in pixels, that the specified text will be when drawn in the current style
