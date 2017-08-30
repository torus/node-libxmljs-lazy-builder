# libxmljs-lazy-builder

Builds XML documents in a _lazy_ way.

## SYNOPSIS

```javascript
var doc = new libxml.Document()
var elem = E("root", {}, E("kit"), "mars", E("kat"))(doc)
elem.toString().should.be.equal('<root><kit/>mars<kat/></root>')
```

## DEPENDS ON
[libxmljs](https://www.npmjs.com/package/libxmljs)

## INSTALLATION

```
npm install libxmljs-lazy-builder
```

## LICENSE
MIT

## AUTHOR
Toru Hisai @torus
