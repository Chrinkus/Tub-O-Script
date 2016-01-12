#Canvas Tutorial - Compositing & Clipping
- shapes were previously drawn one on top of each other and order of drawing was important
    - composite shapes, or complex shapes constructed out of simple shapes, are limited by this method
    - we can change the overlapping effect by changing the globalCompositeOperation property
        - we can not only draw shapes behind other shapes but we can also use it to achieve a great many effects
    - globalCompositeOperation = type
        - this sets the type of compositing operation to apply when drawing new shapes
        - type is a string identifying which of the twelve(?) compositing operations to use
            1. source-over
                - default setting, draws shapes on top of existing canvas content
            2. source-in
                - new shape is drawn only where both new shape and destination canvas overlap. Everything else is made transparent
            3. source-out
                - new shape is drawn where it doesn't overlap existing canvas content
            4. source-atop
                - new shape is only drawn where it overlaps the existing content
            5. destination-over
                - new shapes are drawn behind the existing canvas content
            6. destination-in
                - existing canvas content is kept where both the new shape and existing canvas content overlap. Everything else is made transparent
            7. destination-out
                - existing content is kept where it doesn't overlap the new shape
            8. destination-atop
                - existing canvas is only kept where it overlaps the new shape. New shape is drawn behind the canvas content
            9. lighter
                - where both shapes overlap the colour is determined by adding colour values
            10. copy
                - only the existing canvas is present
            11. xor
                - shapes are made transparent where both overlap and drawn normal everywhere else
            12. multiply
                - pixels from the top layer are multiplied with the corresponding pixel from the bottom layer. A darker picture is the result
            13. screen
                - the pixels are inverted, multiplied, and inverted again. A lighter picture is the result. (opposite of multiply)
            14. overlay
                - combination of multiply and screen. Dark parts on base layer become darker, light parts become lighter
            15. darken
                - Retains the darkest pixels of both layers
            16. lighten
                - Retains the lightest pixels of both layers
            17. color-dodge
                - Divides the bottom layer by the inverted top layer
            18. color-burn
                - divides the inverted bottom layer by the top layer, and then inverts the result
            19. hard-light
                - A combination of multiply and screen like overlay, but with top and bottom layer
            20. soft-light
                - a softer version of hard-light. Pure black or white does not result in pure black or white
            21. difference
                - Subtracts the bottom layer from the top or the other way around to always get a positive value
            22. exclusion
                - like difference, but with lower contrast
            23. hue
                - preserves the luma and chroma of the bottom layer, while adopting the hue of the top layer
            24. saturation
                - preserves the luma and hue of the bottom layer, while adopting the chroma of the top layer
            25. color
                - preserves the luma of the bottom layer, while adopting the hue and chroma of the top layer
            26. luminosity
                - Preserves the hue and chroma of the bottom layer, while adopting the luma of the top layer
- the example compositing.js draws 2 overlapping squares
    - normally second square would be drawn over the first but with "xor" compositing, the overlapping area of both squares is removed
###Clipping paths
- a clipping path is like a normal shape but acts as a mask to hide unwanted parts of shapes
    - everything outside the path will not get drawn
    - similar to the combined effects of the globalCompositeOperation's source-in and source-atop
    - clipping paths are never really drawn to the canvas
        - ideal for drawing multiple shapes in restricted area
- new drawing method
    - clip()
        - turns current path into a clipping path
        - use instead of closePath()
- the example clipping.js draws a randomly generated night sky inside a circular viewport
    - first a black backdrop is drawn
    - then a circular clipping path is defined
        - a circle is drawn using arc() and the path is closed with clip();
        - clipping paths are also part of the save state
    - then 50 randomly positioned and scaled stars are drawn
        - only the stars located within the clipping path are shown
    - the custom drawStar() function randomly scales teh star sizes rather than using the scale function
        - could be rewritten?
    - the constants used to draw the star come from where?
        - radius/0.525731 * 0.200811
