## Installation
```
$ npm install
$ npm run start
```

## Build
```
$ npm i webpack -g
$ npm i electron-packager -g
$ npm run build
```

## Dirstructure

```
actions/
components/
containers/
css/
dist/
reducers/
auth.html
bootstrapper.js
build.js # electron packaging batch
controller.html # controller window
controller.jsx  # controller js
index.js
player.html # controller window
player.jsx  # controller js
routes.js # routing js
```

## Process

```
[Main process]
bootstrapper.js
    ↓
index.js

[Browswer process]

# controller window
controller.html(controller.jsx)

# player window
player.html(player.jsx)
```
