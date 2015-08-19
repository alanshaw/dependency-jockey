var fnArgs = require('fn-args')

module.exports = function () {
  var deps = {}

  function dj (fn, ctx) {
    var depNames = fnArgs(fn)

    return function () {
      var args = [].slice.call(arguments)
      var depArgs = []

      for (var i = 0; i < depNames.length; i++) {
        var dep = deps[depNames[i]]
        if (dep == null) break
        depArgs.push(dep)
      }

      return fn.apply(ctx || this, depArgs.concat(args))
    }
  }

  dj.register = dj.reg = function (name, obj) {
    if (obj) {
      deps[name] = obj
    } else {
      Object.keys(name).forEach(function (n) { deps[n] = name[n] })
    }
    return dj
  }

  return dj
}
