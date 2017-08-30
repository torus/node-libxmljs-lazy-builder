# libxmljs-lazy-builder

Builds XML documents in a _lazy_ way.

## SYNOPSIS

```javascript
      var doc = new libxml.Document()
      var elem = E("root", {}, E("kit"), "mars", E("kat"))(doc)
      elem.toString().should.be.equal('<root><kit/>mars<kat/></root>')
```

## LICENSE
MIT

## AUTHOR
Toru Hisai @torus
