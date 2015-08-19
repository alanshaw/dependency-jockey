var test = require('tape')
var dj = require('./')()

test('should inject a dependency', function (t) {
  t.plan(1)

  var dep = {}

  dj.register('foo', dep)

  dj(function (foo) {
    t.equal(foo, dep)
    t.end()
  })()
})

test('should inject multiple dependencies', function (t) {
  t.plan(2)

  var dep0 = {}
  var dep1 = {}

  dj.register('foo', dep0)
  dj.register('bar', dep1)

  dj(function (foo, bar) {
    t.equal(foo, dep0)
    t.equal(bar, dep1)
    t.end()
  })()
})

test('should inject multiple dependencies as an object', function (t) {
  t.plan(2)

  var dep0 = {}
  var dep1 = {}

  dj.register({
    foo: dep0,
    bar: dep1
  })

  dj(function (foo, bar) {
    t.equal(foo, dep0)
    t.equal(bar, dep1)
    t.end()
  })()
})

test('should inject dependencies and pass rest parameters', function (t) {
  t.plan(3)

  var dep0 = {}
  var dep1 = {}
  var dep2 = {}

  dj.register('foo', dep0)
  dj.register('bar', dep1)

  dj(function (foo, bar, rest) {
    t.equal(foo, dep0)
    t.equal(bar, dep1)
    t.equal(rest, dep2)
    t.end()
  })(dep2)
})
