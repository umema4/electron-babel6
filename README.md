# electron-babel6
A electron app template to use babel v6

## using node version
- v5.6.0

## Start developing
install electron, gulp and modules

```
npm install -g electron-prebuilt gulp
npm install
```

build es6 file and minify js with sourcemap.
```
gulp
or
gulp build-dev
```

build es6 file and minify js without sourcemap.
```
gulp
or
gulp build-prod
```

## directory structure
```
project/
    ├─ config/
    ├─ assets/
    │   └─ app.bundle.js
    │   └─ app.bundle.js.map
    ├─ src/
    │   └─ js/
    │         └─ app.js
    ├─ index.html
    └─ main.js
```


## memo
- use shrinkwrap
```
npm shrinkwrap --dev
```

## TODO
- use sass
- use import
- packaging
- livereload
