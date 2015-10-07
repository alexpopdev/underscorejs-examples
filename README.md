underscorejs-examples
=================
##NOTE
All the book examples are completed in a draft form and they will change during the final revisions. Currently the npm and bower packages are commited to source control but after the book is released there will be a branch available that does not contain these packages.

##Overview
This repository contains the examples for my upcoming book "[Learning Underscore.js](http://bit.ly/1JwvBOO)".  

The folders and examples are named in such a way they can be explored outside of the book context.

If these examples prove useful to the community I intend to create a branch after the book is finished (or even a separate fork) and accept further additions or even significant changes unrelated to the content of the book.

##Examples index
The examples are organised in these sections (that match a specific chapter of the book):

### [Getting started](getting-started) (Chapter 1: Getting started with Underscore.js)
1. Starter example with ECMAScript 5 - [code](getting-started/starter-example-with-ECMAScript5), [preview](http://plnkr.co/edit/EP3H268pw1wQbu4cp9iU?p=preview)
2. Starter example with _.find() - [code](getting-started/starter-example-with-underscore.find), [preview](http://plnkr.co/edit/O3vUZspyamLOnoMl4aWK?p=preview)
3. Starter example with _.countBy() - [code](getting-started/starter-example-with-underscore.countBy), [preview](http://plnkr.co/edit/H7UjDsgfxhuUPPC1UDq6?p=preview)
4. Examples for _.map() and _.reduce() - [code](getting-started/underscore.map.reduce), [preview](http://plnkr.co/edit/TCG7PYLJW2imcDAbzwsv?p=preview)
5. Examples for _.map() and _.reduce() with IIFE (immediately invoked function expression) - [code](getting-started/underscore.map.reduce-iife), [preview](http://plnkr.co/edit/icJXL2I1gCgQ7qbhEV4P?p=preview)
6. Revealing module pattern - [code](getting-started/revealing-module-pattern), [preview](http://plnkr.co/edit/eHa7Ot9vNcuCAYg5vgGQ?p=preview)
7. Examples for _.map() and _.reduce() with revealing module pattern - [code](getting-started/underscore.map.reduce-revealing-module), [preview](http://plnkr.co/edit/MVLfs688mBhv5kCbqN6g?p=preview)
8. Examples for _.map() and _.reduce() with local dependencies via Bower - [code](getting-started/underscore.map.reduce-with-local-dependencies)
9. Example for _.map() and _.reduce() with Jasmine tests - [code](getting-started/underscore.map.reduce-with-jasmine)


### [Collections](collections) (Chapter 2: Using Underscore.js with collections)
1. Examples for _.each() using object properties and set context - [code](collections/each-with-properties-and-context)
2. Examples for _.map() and _.reduce() using object properties - [code](collections/map.reduce-with-properties)
3. Searching examples using _.find(), _.some(), _.findWhere(), _.contains - [code](collections/searching)
4. Filtering examples using _.filter(), _.where(), _.reject() - [code](collections/filtering)
5. Aggregations examples using _.min() and _.max() - [code](collections/aggregations)
6. Transformations examples using _.sortBy(), _.groupBy(), _.indexBy(), _.countBy - [code](collections/transformations)

### [Arrays, functions and objects](arrays-objects-functions) (Chapter3: Using Underscore.js with arrays, functions and objects)
1. Arrays examples using _.first(), _.rest(), _.last(), _.initial(), _.union(),  _.uniq(), _.intersection(), _.difference(), _.zip() - [code](arrays-objects-functions/arrays)
2. Objects examples using _.keys(), _.pairs(), _.functions(), _.pick(), _.omit() - [code](arrays-objects-functions/objects)
3. Object assertions using _.isX() functions like. _.isNumber(), _isNull() and others - [code](arrays-objects-functions/objects-assertions)
4. Functions example using _.bind() - [preview](http://bit.ly/1NekLkz)
5. Functions examples using _.partial(), _.wrap() - [code](arrays-objects-functions/functions)

### [OOP and FP paradigms](programming-paradigms) (Chapter 4: Programming paradigms with Underscore.js)
1. Object inheritance examples with ECMAScript 5 - [code](programming-paradigms/oop-inheritance)
2. Classes and validation examples with Underscore - [code](programming-paradigms/oop-underscore)
3. Adopting a functional programming(FP) style - [code](programming-paradigms/fp)
4. FP examples using _.chain(), value(), _.tap() - [code](programming-paradigms/fp-underscore)

### [Browser, Node.js and database examples](browser-server-database) (Chapter 5: Using Underscore.js in the browser, on the server, and with the database)
1. Browser examples using _.template() with different styles of templates - [code](browser-server-database/browser-underscore)
2. Examples of Node.js modules - [code](browser-server-database/nodejs-modules)
3. Examples of JavaScript code converted to Node.js modules and tests for Node.js modules - [code](browser-server-database/nodejs-underscore)
4. Examples for using Underscore with MongoDB - [code](browser-server-database/mongodb-underscore)
5. Examples for using Underscore with PostgreSQL - [code](browser-server-database/postgresql-underscore)

### [Advanced topics part 1](advanced-topics-1) (Chapter 6: Related Underscore.js libraries and ECMAScript standards)
1. Underscore-contrib examples - [code](advanced-topics-1/underscore-contrib)
2. lodash examples - [code](advanced-topics-1/lodash-migration)
3. Using ES6 with Babel directly in browsers - [code](advanced-topics-1/babel-client)
4. Using ES6 with Babel CLI in browsers  - [code](advanced-topics-1/babel-client-cli)
5. Using ES6 with Babel CLI in Node.js  - [code](advanced-topics-1/babel-server)
6. Starter ES6 examples with ES6 tests (in a project using Babel CLI for code execution and jasmine-es6 for testing) - [code](advanced-topics-1/es6-examples)
