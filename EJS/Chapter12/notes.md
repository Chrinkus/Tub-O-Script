#Chapter 12 - Javascript and The Browser
- the development of Web technology has been laisez faire
    - with no central controlling body it has been free to expand and add new functionality without oversight
        - this has produced mixed results

###Networks and the Internet
- anytime 2 or more computers are connected there is a network
- the internet was developed in the 80s to allow computers to connect all over the world
- network protocol
    - describes a style of communication over the internet
        - there are protocols for sending email, fetching it, receiving it, or sharing files
- most protocols are built off of other protocols
    - the creation of a stream to process the above requests is itself a technical problem
- Transmission Control Protocol (TCP)
    - most communication on the internet is built on top of TCP
    - one computer listens for others to talk to it
        - for one machine to listen to many types of communication ports are used to identify individual listeners
            - most protocols specify which port should be used by default
    - another computer can then create a connection to the first computer using the correct port number
        - if target machine is accessible and is listening on that port the connection is then created
    - the listening computer is the server and the connecting computer is the client
        - connection is 2-way so both machines may send and receive data through it

###The Web
- the world wide web is a set of protocols and formats that allows us to access webpages in the browser
    - protocols create the framework that permits data transfer
- to add content to the web, connect to the internet and listen on port 80 using Hypertext Transfer Protocol (HTTP)
- Universal Resource Locator (URL)
    - each document on the web is named by a URL
```
 http://eloquentjavascript.net/12_browser.html
|      |                      |               |
protocol       server              path
```
- the first section tells us the URL uses the HTTP protocol
    - as opposed to encrypted HTTP: https://
- then comes the server we are requesting the document from
- lastly is the path that identifies the specific document we are looking for
- each machine connected to the internet gets a unique IP address
    - such as 37.187.37.82
    - these can be used to identify a server but are awkward to memorize and type
        - alternatively we can register a domain name to a URL and use that instead
            - eloquentjavascript.net is a registered domain that takes you to an IP address

##HTML
- Hypertext Markup Language
    - document format used for webpages
        - contains text and tags that give structure to the text
            - tags specify links, paragraphs, and headings
```html
<!doctype html>
<html>
    <head>
        <title>My home page</title>
    </head>
    <body>
        <h1>My home page</h1>
        <p>Hello, I am Marijn and this is my home page.</p>
        <p>I also wrote a book! Read it <a href="http://eloquentjavascript.net">here</a>.</p>
    </body>
</html>
```
- tags are wrapped in angle brackets (< and >)
    - give the page structure
    - most tags have an opening and closing tag
- <!doctype html>
    - tells browser to interpret it as modern html
- <head></head>
    - contains information about the document
- <body></body>
    - contains the actual document
    - <h1></h1>
        - the heading tags scale from h1 - h6
    - <p></p>
        - used for paragraphs
- some opening tags contain extra information in the form of name="value" pairs or attributes
    - <a href="http//..."></a>
        - href - hypertext reference
- if a tag is not meant to enclose any content it does not usually require a closing tag
    - <img src="http//...jpg">
        - displays an image found at a given source
- in order to include angle brackets as text in html we must use special notation similar to escaping characters in Javascript
    - < = &lt; (less than)
    - > = &gt; (greater than)
    - " = &quot; (quotes)
    - & = &amp; (ampersand)
    - an ampersand followed by a word and a semicolon is called an entity
- HTML is parsed in a very error tolerant way
    - when tags are missing the browser fills them in as best as it can
    - the following parses to the same result as first (correct) example
```html
<!doctype html>

<title>My home page</title>

<h1>My home page</h1>
<p>Hello, my name is Marijn and this is my home page.
<p>I also wrote a book! Read it <a href=http://eloquentjavascript.net>here</a>
```
- the html, head, and body tags are gone completely
    - browser recognizes <title> as a head element and <h1> as a body element
    - paragraphs aren't closed and quotes around URL are gone
    - while the browser can cover for these errors it is best to do it right (duh-doi)

###HTML and JavaScript
- most important tag to us is <script> tag
    - allows us to include javascript in the document
```html
<h1>Testing alert</h1>
<script>alert("hello!");</script>
```
- this script will run as soon as the tag is encountered
- writing large sections of code in an html document is impractical
    - <script> can be given a src attribute to fetch a script file from a URL
```html
<h1>Testing alert</h1>
<script src="code/hello.js"></script>
```
- when an HTML page references URLs as part of itself it will retrieve them immediately and use them on the page
- <script> must always be enclosed by a </script> even if it references another file
- some attributes can also contain javascript code:
```html
<button onclick="alert('Boom');">DO NOT PRESS</button>
```
- note the staggering of single and double quotes
    - could have used &quot;

###In the Sandbox
- the environment of the web is very open and free
    - browsers allow us to access pages without worrying about the people behind them
- some useful functionality is restricted due to it being manipulatable and a security risk

###Compatibility and the Browser Wars
- Mosaic > Netscape > Internet Explorer
    - during the rise of each browser new web functionality was created by the vendor thus creating compatibility issues with other older browsers
    - this state of warring vendors created a negative environment for developers of the time, affecting end user experience
- Mozilla Firefox
    - not-for-profit offshoot of Netscape came and took a large chunk of IE's market share
- Google Chrome, Apple Safari, and now Opera came along after
    - there was a generally more responsible and serious attitude towards standards and better engineering practices resulting in better compatibility and less bugs
- some people, businesses are stuck using older browsers and must be considered

END OF CHAPTER
