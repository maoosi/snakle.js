import knot from 'knot.js'

export default class Snakle {

    constructor (selector, options = {}) {
    // instance constructor
        this.options = {
            thickness: options.thickness || 22,
            color: options.color || 'red',
            length: options.length || 10,
            speed: options.speed || 15
        }

        this.selector = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector

        this.emitter = knot()

        this.initiated = false

        return this
    }

    _globalVars () {
    // global vars
        this.canvas = false
        this.ctx = false
        this.snake = []
        this.parentWidth = this.selector.clientWidth
        this.parentHeight = this.selector.clientHeight
        this.direction = 'right'
        this.directionQueue = this.direction
        this.anim = false
        this.starter = false
    }

    _throttle (callback, delay) {
    // throttle function
        let last
        let timer
        return () => {
            let context = this
            let now = +new Date()
            let args = arguments
            if (last && now < last + delay) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    last = now
                    callback.apply(context, args)
                }, delay)
            } else {
                last = now
                callback.apply(context, args)
            }
        }
    }

    _blendRGBColors (c0, c1, p) {
    // blend RGB colors
        let f = c0.split(',')
        let t = c1.split(',')
        let R = parseInt(f[0].slice(4))
        let G = parseInt(f[1])
        let B = parseInt(f[2])

        return 'rgb(' + (Math.round((parseInt(t[0].slice(4)) - R) * p) + R) + ',' + (Math.round((parseInt(t[1]) - G) * p) + G) + ',' + (Math.round((parseInt(t[2]) - B) * p) + B) + ')'
    }

    _blendHexColors (c0, c1, p) {
    // blend Hex colors
        let f = parseInt(c0.slice(1), 16)
        let t = parseInt(c1.slice(1), 16)
        let R1 = f>>16
        let G1 = f>>8&0x00FF
        let B1 = f&0x0000FF
        let R2 = t>>16
        let G2 = t>>8&0x00FF
        let B2 = t&0x0000FF

        return '#' + (0x1000000 + (Math.round((R2 - R1) * p) + R1) * 0x10000 + (Math.round((G2 - G1) * p) + G1) * 0x100 + (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1)
    }

    _blendColors(color1, color2, percent) {
    // universal blend colors
        if (color1.length > 7) return this._blendRGBColors(color1, color2, percent)
        else return this._blendHexColors(color1, color2, percent)
    }

    _bindEvents () {
    // create events listeners
        this.resize = this._throttle((event) => {
            this._resize()
        }, 250)

        window.addEventListener('resize', this.resize, false)
    }

    _unbindEvents () {
    // remove events listeners
        window.removeEventListener('resize', this.resize, false)
    }

    _resize () {
    // viewport resize triggered
        this.parentWidth = this.selector.clientWidth
        this.parentHeight = this.selector.clientHeight
        this.canvas.setAttribute('width', this.parentWidth)
        this.canvas.setAttribute('height', this.parentHeight)
        this.ctx = this.canvas.getContext('2d')
        this._drawSnake()

        this.emitter.emit('resize')
    }

    _createCanvas () {
    // create html5 canvas
        this.canvas = document.createElement('canvas')
        this.canvas.setAttribute('width', this.parentWidth)
        this.canvas.setAttribute('height', this.parentHeight)
        this.canvas.setAttribute('style', 'position:absolute;left:0;top:0;z-index:1;')
        this.selector.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
    }

    _createSnake () {
    // create snake
        for (let i = this.options.length - 1; i > -1; i--) {
            let extra = i - (this.canvas.width / this.options.thickness)
            let iX = extra > 0 ? this.canvas.width - this.options.thickness : i * this.options.thickness
            let iY = extra > 0 ? extra * this.options.thickness : 0

            this.snake.push({ x: iX, y: iY })
        }
    }

    _drawSnake () {
    // draw snake on canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for(let i = 0; i < this.options.length; i++) {
            let x = this.snake[i].x
            let y = this.snake[i].y

            // Fix positioning issues on X
            if (x > this.canvas.width - this.options.thickness) {
                x = this.canvas.width - this.options.thickness
            } else if (x <= 0) {
                x = 0
            }

            // Fix positioning issues on Y
            if (y > this.canvas.height - this.options.thickness) {
                y = this.canvas.height - this.options.thickness
            } else if (y <= 0) {
                y = 0
            }

            // Snake color
            if (this.options.color.constructor === Array && this.options.color.length > 1) {
                let blend = (i * 100 / this.options.length) / 100
                this.ctx.fillStyle = this._blendColors(this.options.color[0], this.options.color[1], blend)
            } else {
                let color = this.options.color.constructor === Array ? this.options.color[0] : this.options.color
                this.ctx.fillStyle = color
            }

        	this.ctx.fillRect(x, y, this.options.thickness, this.options.thickness)
    	}

        this.emitter.emit('draw')
    }

    _moveSnake () {
    // changing the snake's movement
        let x = this.snake[0].x
    	let y = this.snake[0].y
    	this.direction = this.directionQueue

    	if (this.direction === 'right') {
    		x += this.options.thickness
    	}
    	else if (this.direction === 'left') {
    		x -= this.options.thickness
    	}
    	else if (this.direction === 'up') {
    		y -= this.options.thickness
    	}
    	else if (this.direction === 'down') {
    		y += this.options.thickness
    	}

    	let tail = this.snake.pop()
    	tail.x = x
    	tail.y = y
    	this.snake.unshift(tail)
    }

    _animStep (timestamp) {
    // snake animation frame
        if (!this.starter) this.starter = timestamp

        if (timestamp - this.starter >= this.options.speed) {
            let head = this.snake[0]

            if (head.y >= this.canvas.height - this.options.thickness
                && this.directionQueue != 'left' && this.direction != 'left') {
            // bottom wall collision
                this.directionQueue = 'left'
            } else if (head.x <= 0
                && this.directionQueue != 'up' && this.direction != 'up') {
            // left wall collision
                this.directionQueue = 'up'
            } else if (head.y <= 0
                && this.directionQueue != 'right' && this.direction != 'right') {
            // top wall collision
                this.directionQueue = 'right'
            } else if (head.x >= this.canvas.width - this.options.thickness
                && this.directionQueue != 'down' && this.direction != 'down') {
            // right wall collision
                this.directionQueue = 'down'
            }

            this._drawSnake()
            this._moveSnake()

            this.starter = false
        }

        this._playAnimation()
    }

    _playAnimation () {
    // start snake animation
        this.anim = window.requestAnimationFrame((timestamp) => {
            this._animStep(timestamp)
        })
    }

    _pauseAnimation () {
    // pause snake animation
        if (this.anim) {
            window.cancelAnimationFrame(this.anim)
            this.anim = false
            this.starter = false
        }
    }

    init () {
    // init vars, canvas, and snake
        if (!this.initiated) {
            this._globalVars()
            this._createCanvas()
            this._createSnake()
            this._drawSnake()
            this._bindEvents()

            this.initiated = true
            this.emitter.emit('init')
        }

        return this
    }

    destroy () {
    // destroy snake & instance
        if (this.initiated) {
            this.stop()
            this._unbindEvents()
            this.canvas.parentNode.removeChild(this.canvas)
            this.canvas = false
            this.ctx = false
            this.snake = []

            this.initiated = false
            this.emitter.emit('destroy')

            this.emitter.off('init')
            this.emitter.off('destroy')
            this.emitter.off('reset')
            this.emitter.off('play')
            this.emitter.off('pause')
            this.emitter.off('stop')
            this.emitter.off('resize')
            this.emitter.off('draw')
        }

        return this
    }

    reset () {
    // reset snake position
        if (this.initiated) {
            this.snake = []
            this._createSnake()
            this._drawSnake()

            this.emitter.emit('reset')
        }

        return this
    }

    play () {
    // play animation
        this._playAnimation()

        this.emitter.emit('play')

        return this
    }

    pause () {
    // stop animation
        this._pauseAnimation()

        this.emitter.emit('pause')

        return this
    }

    stop () {
    // stop animation
        this.pause()
        this.reset()

        this.emitter.emit('stop')

        return this
    }

    on (...args) { return this.emitter.on(...args) }
    off (...args) { return this.emitter.off(...args) }
    once (...args) { return this.emitter.once(...args) }

}
