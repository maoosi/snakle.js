# Snakle.js

ES6 library using Canvas - Snake loader animation around the viewport borders.

> **Docs in progress / Testing in progress**

## Getting Started

1. [Usage](#usage)
2. [Options](#options)
3. [API / Events](#api--events)
4. [Browser Support](#browser-support)

## Usage

Snakle was developed with a **modern JavaScript workflow** in mind. To use it, it's recommended you have a build system in place that can transpile ES6, and bundle modules.

### ES6

Simply import `snakle.js`, then instantiate it.

```javascript
// import library
import Snakle from 'snakle.js'

// create a new instance
const snake = new Snakle('#selector', { /* options here */ })

// initiate
snake.init()

// animate
snake.play()
```

## Options

Settings overview list:

```javascript
Snakle('#selector', {
    thickness: 22,
    color: 'red',
    length: 10,
    speed: 15
})
```

Option details are detailed below.

Option | Type | Default | Description
---|---|---|---
`thickness` | *integer* | `22` | Thickness of the snake body (the snake body is made of multiple squares, where thickness represents the width and height of each square).
`color` | *string or array* | `red` | Color of the snake body (RGB or hexadecimal). Can be a single color `#3498db`, or a two colors gradient by using a array[2] `['red', 'blue']`.
`length` | *integer* | `10` | Length of the snake body or tail length (also represents the number of squares that the body is made of).
`speed` | *integer* | `15` | Speed of the snake animation (FPS).

## API / Events

Snakle exposes the following methods, and corresponding events:

* [init](#init)
* [play](#play)
* [pause](#pause)
* [reset](#reset)
* [stop](#stop)
* [destroy](#destroy)

Note that all methods are **chainable**, and all events includes `on`, `off`, and `once`.

### .init()

Used to _generate the snake_ and draw it into the viewport.

```javascript
snake.init()
snake.on('init', () => { /* callback here */ })
```

### .play()

Used to _play the snake animation_.

```javascript
snake.play()
snake.on('play', () => { /* callback here */ })
```

### .pause()

Used to _pause the snake animation_.

```javascript
snake.pause()
snake.on('pause', () => { /* callback here */ })
```

### .reset()

Used to _reset the snake position_ to it's initial state.

```javascript
snake.reset()
snake.on('reset', () => { /* callback here */ })
```

### .stop()

Used to _stop the snake animation_. Equivalent to .pause() + .reset().

```javascript
snake.stop()
snake.on('stop', () => { /* callback here */ })
```

### .destroy()

Used to _completely remove the snake_ from the selector. Restore the initial state.

```javascript
snake.destroy()
snake.on('destroy', () => { /* callback here */ })
```

## Browser Support

Snakle is fully supported by **Evergreen Browsers** (Edge, Opera, Safari, Firefox & Chrome) and **IE 11**.

## License

[MIT](https://github.com/maoosi/perstrok.js/blob/master/LICENSE.md) © 2016 Sylvain Simao

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
