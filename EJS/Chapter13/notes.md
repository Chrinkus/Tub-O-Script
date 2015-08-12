#Chapter 13 - The Document Object Model
- when a webpage is opened the browser parses the HTML text and builds up a model of the structure to draw it
- the framework can be read from and changed in a live environment

###Document Structure
- an HTML document is a nested set of boxes
    - the <title> box is found within the <head> box
- for each box there is an object which will tell us what tag it represents and what it contains
    - this is the document object model (DOM)
- the global variable ```document``` provides access to these objects
    - it has a ```documentElement``` property which refers to the object representing the ```html``` tag
        - there are properties for the ```head``` and ```body``` tags as well

###Trees
- a data structure is considered a tree when it has a branching structure with no cycles and has a single well defined root
    - for the DOM, ```document.documentElement``` serves as the root
        - branches off of this are children of it and it in turn is their parent
        - Nodes for regular elements, which represent tags, determine the structure of the tree
            - ex: ```document.body```
            - these can have child nodes
                - back to the tree analogy, pieces of text or comments would be considered leaves
- each DOM node object has a ```nodeType``` property
    - a numeric code that identifies the type of node
    - regular elements have the value 1
        - is also the constant property ```document.ELEMENT_NODE```
    - text nodes have the value 3
        - ```document.TEXT_NODE```
    - comments have the value 8
        - ```document.COMMENT_NODE```

###The Standard
- the use of generic numeric codes is due to the DOM being designed for multiple systems other than just javascript
    - element nodes have a ```childNodes``` property that holds an array-like object
        - has a length property and properties labeled by numbers to access the children of it
            - unfortunately this is a ```NodeList``` type not an actual array-like
            - as a result, code that interacts with the DOM can get overly long

###Moving Through the Tree
- DOM nodes contain many links to nearby nodes
    - Node.firstChild
    - Node.lastChild
    - Node.childNodes - every type 1 node has an array-like object holding its children
    - Node.parentNode - every node has a parent node
    - Node.previousSibling
    - Node.nextSibling
        - for a firstChild, previousSibling will be null
            - as will nextSibling for a lastChild
- recursive function that scans a document for a given string
    - nodeValue refers to the string of text in the TEXT_NODE
```javascript
function talksAbout(node, string) {
    if (node.nodeType == document.ELEMENT_NODE) {
        for (var i = 0; i < node.childNodes.length; i++) {
            if (talksAbout(node.childNodes[i], string)) {
                return true;
            }
        }
        return false;
    } else if (node.nodeType == document.TEXT_NODE) {
        return node.nodeValue.indexOf(string) > -1;
    }
}
console.log(talksAbout(document.body, 'book')); //> true
```

###Finding Elements
- text nodes are created for the whitespace between elements
    - example body tag has 3 tagged children
        - <h1> & 2 <p>'s
    - AND 4 text nodes consisting of the spaces between those nodes
