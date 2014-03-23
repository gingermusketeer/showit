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
- Simpler
- Encourages modularity
- Share code (node backend)
- npm for the win!

---
# Browserify?

- node style modules
- npm (and bower)
- node core
- always in production*

---
# Transforms

- brfs
- es6ify
- debowerify
- envify
- uglifyify
- cssify

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
# Misc

- Multiple bundles
- Can be used in conjunction with
 - normal script tags
 - require.js
- shims
- CDNs
 - http://wzrd.in/
---
layout: true
class: center, middle
---
#Questions?
gingermusketeer @ github, twitter
