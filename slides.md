name: first
layout: true
class: center, middle
---
# Browserify

Max Brosnahan @ CHC.js

---
layout:false

# Browserify?

 Client side javascript dependency management tool

- Think require.js

---
# Differences to require.js
- Always in 'production'

---
# Browserify?

- node style modules
- npm (and bower)
- node core
- always in production*

---
# Under the hood

```js

```
---
# Transforms

- brfs
- es6ify
- debowerify
- envify
- uglifyify

---
# Transforms - coffeescript
```js
var coffee = require('coffee-script');
var through = require('through');

b.transform(function (file) {
    var data = '';
    return through(write, end);

    function write (buf) { data += buf }
    function end () {
        this.queue(coffee.compile(data));
        this.queue(null);
    }
});
```
---
# Multiple bundles
---
# Working with existing tooling
##no module system

##require.js
---
#shims
---
#CDNs
http://wzrd.in/
---
layout: true
class: center, middle
---
#Questions?
gingermusketeer @ github, twitter
