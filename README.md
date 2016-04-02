# React/Redux Project Template

A front-end application structure for development with React and Redux.


## Getting started

Download and install the dependencies

```sh
$ git clone https://github.com/chaucerbao/react-redux-template.git
$ cd react-redux-template/
$ npm install
```


## Running tasks

### Development
```sh
$ npm start
```
Compiles the source with source maps, watches for changes, and serves the site at [http://localhost:8080/](http://localhost:8080/).

### Production
```sh
$ npm run build
```
Compiles the source, then minifies and compresses the output for production use.

### Clean
```sh
$ npm run clean
```
Cleans the public directory of all files.

### Test
```sh
$ npm test
```
Runs the test suite against the application.

```sh
$ npm run test:watch
```
Watch for changes and re-runs the test suite.


## Directory structure

```
src/
├─ components/
│  ┊
│  └─ component/
│     ├─ index.js
│     └─ style.css
│
├─ lib/
│  ┊
│  └─ library.js
│
├─ store/
│  ┊
│  ├─ branch/
│  │  ├─ actions.js
│  │  └─ reducers.js
│  ├─ index.js
│  └─ reducers.js
│
├─ index.js
└─ router.js
```

### Usage
`components/` contains all React components, and can be organized into sub-directories as appropriate.

`lib/` contains libraries that can be shared across the project.

`store/` contains the Redux actions and reducers organized by branches of the state tree.


### Tools
Development:

* [React]
* [Redux]
* [Babel]
* [PostCSS]

Testing:

* [Mocha]
* [Chai]
* [Sinon.JS]

Misc:

* [Webpack]


[Babel]: https://babeljs.io/
[Chai]: http://chaijs.com/
[Mocha]: http://mochajs.org/
[PostCSS]: http://postcss.org/
[React]: https://facebook.github.io/react/
[Redux]: http://redux.js.org/
[Sinon.JS]: http://sinonjs.org/
[Webpack]: http://webpack.github.io/
