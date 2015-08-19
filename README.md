# dependency-jockey
Jock dependencies into any function.

## Example

```js
//// mod.js

module.exports = function (dep1, dep2, rest) {
  /* ... */
}


//// main.js

var dj = require('dependency-jockey')()
var mod = require('./mod')

function Dep1 () {}
function Dep2 () {}

dj.register('dep1', new Dep1)
dj.register('dep2', new Dep2)
// or
dj.register({dep1: new Dep1, dep2: new Dep2})

var rest = 123

mod = dj(mod) // jock the deps

mod(rest) // mod is called with dep1, dep2 and rest
```

## API

### `var dj = require('dependency-jockey')()`
Create a new dj for jocking your deps.

### `dj.register(name, obj)`
Register a dependency `obj` for the name `name`.

### `dj.register(deps)`
Register multiple dependencies. `deps` is an object whose keys are the dependency names and values are the dependency object.

### `dj(func)`
Jock the dependencies for `func`. Returns a new function, that, when called, will automatically populate parameter names that have dependencies registered for them.

**Beware**, once dj finds a param that doesn't have a dependency registered it stops, allowing you to call the function and pass additional params, not registered with dj.
