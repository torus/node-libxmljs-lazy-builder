# libxmljs-lazy-builder

Builds XML documents in a _lazy_ way.

## SYNOPSIS

```javascript
const E = require('libxmljs-lazy-builder')
const libxml = require('libxmljs')

const doc = new libxml.Document()
const elem = E("root", {},
             E("kit", {color: "brown"}),
             "mars",
             E("kat"))(doc)

elem.toString()
   // => '<root><kit color="brown"/>mars<kat/></root>'
```

### INSTALLATION

```
npm install libxmljs-lazy-builder --save
```

## DESCRIPTION

### API

#### E (name, {attrName: value, ...}, children, ...)

(You can name it arbitrarily.) This function generates a function which takes a libxml.Document object and returns a libxml.Element object.

A child can be a string or an another E() element. You can specify zero or more children.

Please note that you need to _call_ the returned value from E() with a Document object to get an actual Element object. So, the whole structure should be something like:

```javascript
const doc = new libxml.Document()
const elem = E("x", {}, E("y", {}, ...), ...)(doc)
```

### Examples

Please see the test script in the repository.

### DEPENDS ON
[libxmljs](https://www.npmjs.com/package/libxmljs)

## LICENSE
MIT

## AUTHOR
Toru Hisai @torus
