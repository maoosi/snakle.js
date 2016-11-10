# Snakle.js

Javascript library using Canvas - Snake loader animation around the viewport borders.

Try the [**Demo samples**](http://codepen.io/collection/DQKWJQ/).

## Getting Started

1. [Installation](#installation)
2. [Usage](#usage)
3. [Options](#options)
4. [API / Events](#api--events)
5. [Browser Support](#browser-support)

## Installation

### Using NPM

```bash
npm i snakle.js --save
```

### jsDelivr CDN

> Not published yet

```bash
<script src="https://cdn.jsdelivr.net/snakle.js/1.0.0/snakle.js"></script>
```

## Usage

```javascript
// ES6 module import
import Snakle from 'snakle.js' // not required if using a CDN or directly include

// instantiate with options
const snake = new Snakle('#selector', { /* options here */ })

// initiate and draw the snake
snake.init()

// play animation
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
`color` | *string or array* | `red` | Color of the snake body (RGB or hexadecimal). Can be a single color `#3498db`, or a two colors gradient by using a array[2] `['#0000ff', '#ffffff']`.
`length` | *integer* | `10` | Length of the snake body or tail length (also represents the number of squares that the body is made of).
`speed` | *integer* | `15` | Speed of the snake animation (FPS).

## API / Events

Snakle exposes the following methods, and events:

* [init](#init)
* [play](#play)
* [pause](#pause)
* [reset](#reset)
* [stop](#stop)
* [destroy](#destroy)
* [draw](#draw)
* [resize](#resize)

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

### draw

Emitted each time the snake is re-drawn into the viewport during animation.

```javascript
snake.on('draw', () => { /* callback here */ })
```

### resize

Emitted each time the snake is re-drawn after a resize of the viewport.

```javascript
snake.on('resize', () => { /* callback here */ })
```

## Browser Support

Snakle is fully supported by **Evergreen Browsers** (Edge, Opera, Safari, Firefox & Chrome) and **IE 11**.

## License

[MIT](https://github.com/maoosi/snakle.js/blob/master/LICENSE.md) © 2016 Sylvain Simao

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
