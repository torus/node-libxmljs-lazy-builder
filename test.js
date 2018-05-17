var should = require('should')

var E = require('.')

describe('libxmljs', function() {
  it('should build a document with a node with empty content', function() {
    var doc = new E.libxml.Document()
    doc.node('root').node('child', '')
    var expected = ['<?xml version="1.0" encoding="UTF-8"?>',
                    '<root>',
                    '  <child/>',
                    '</root>', ''].join('\n')

    doc.toString().should.be.equal(expected)
  })

  it('should build a document with a node with content containing special character', function() {
    var doc = new E.libxml.Document()
    doc.node('root').node('child', '<>')
    var expected = ['<?xml version="1.0" encoding="UTF-8"?>',
                    '<root>',
                    '  <child>&lt;&gt;</child>',
                    '</root>', ''].join('\n')

    doc.toString().should.be.equal(expected)
  })

  it('text nodes', function() {
    var doc = new E.libxml.Document()
    doc.node('root', 'content <>')
    var text = doc.root().child(0)
    var elem = new E.libxml.Element(doc, 'foo')
    elem.addChild(text)
    elem.toString().should.be.equal('<foo>content &lt;&gt;</foo>')
  })
})

describe('libxmljs-lazy-builder', function() {
  it('should return a function', function() {
    E("root").should.be.a.Function()
  })
  it('can take attributes', function() {
    E("root", {a: 123}).should.be.a.Function()
  })
  it('can take children', function() {
    E("root", {}, E("child"), E("child")).should.be.a.Function()
  })
})

describe('function returned from libxmljs-lazy-builder', function() {
  it('should take a document and return an Element', function() {
    var doc = new E.libxml.Document()
    E("root")(doc).should.be.an.instanceof(E.libxml.Element)
  })

  describe('with no attributes', function() {
    it('should take a document and return an Element with the attributes', function() {
      var doc = new E.libxml.Document()
      var elem = E("root", {})(doc)
      elem.toString().should.be.equal('<root/>')
    })
  })

  describe('with attributes', function() {
    it('should take a document and return an Element with the attributes', function() {
      var doc = new E.libxml.Document()
      var elem = E("root", {key: "value", anotherKey: "lueva"})(doc)
      elem.should.be.an.instanceof(E.libxml.Element)
      elem.attr("key").value().should.be.equal("value")
      elem.attr("anotherKey").value().should.be.equal("lueva")
      elem.toString().should.be.equal('<root key="value" anotherKey="lueva"/>')
    })
  })

  describe('with text', function() {
    it('should take a document and return an Element with the text', function() {
      var doc = new E.libxml.Document()
      var elem = E("root", {}, "content text")(doc)
      elem.toString().should.be.equal('<root>content text</root>')
    })
  })

  describe('with children', function() {
    it('should take a document and return an Element with the children', function() {
      var doc = new E.libxml.Document()
      var elem = E("root", {}, E("kit"), E("kat"))(doc)
      elem.toString().should.be.equal('<root><kit/><kat/></root>')
    })
  })

  describe('with children as an array', function() {
    it('should take a document and return an Element with the children', function() {
      var doc = new E.libxml.Document()
      var elem = E("root", {}, [E("kit"), E("kat")])(doc)
      elem.toString().should.be.equal('<root><kit/><kat/></root>')
    })
  })

  describe('with children including text', function() {
    it('should take a document and return an Element with the children', function() {
      var doc = new E.libxml.Document()
      var elem = E("root", {}, E("kit"), "mars", E("kat"))(doc)
      elem.toString().should.be.equal('<root><kit/>mars<kat/></root>')
    })
  })

  describe('with everything', function() {
    it('should work as an example', function() {
      const doc = new E.libxml.Document()
      const elem = E("root", {},
                   E("kit", {color: "brown"}),
                   "mars",
                   E("kat"))(doc)
      elem.toString().should.be.equal(
        '<root><kit color="brown"/>mars<kat/></root>')
    })
  })

  describe('with undefined', function() {
    it('should take a document and return an Element with no children', function() {
      var doc = new E.libxml.Document()
      var elem = E("root", {}, undefined)(doc)
      elem.toString().should.be.equal('<root/>')
    })
  })

  describe('with text containing special characters', function() {
    it('should take a document and return an Element with text', function() {
      var doc = new E.libxml.Document()
      var elem = E("root", {}, "a<b>c")(doc)
      elem.toString().should.be.equal('<root>a&lt;b&gt;c</root>')
    })
  })

})
