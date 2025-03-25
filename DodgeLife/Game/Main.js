window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('screen')
    context = canvas.getContext('2d')

    window.addEventListener('keydown', keyDown, false)
    window.addEventListener('keyup', keyUp, false)

    gameInit()

    frameCurrent = performance.now()
    gameLoop = requestAnimationFrame(loop)    
}

function gameInit() {
    board = new Board()
    player = new Player()
}

function loop() {
    framePrevious = frameCurrent
    frameCurrent = performance.now()
    delta = frameCurrent - framePrevious

    loopScene()

    gameLoop = requestAnimationFrame(loop)
}

function keyDown(event) {
    let key = event.key
    keyDownScene(key)

    if (key === 'w') {
        keyPress['up'] = true
    }
    if (key === 'a') {
        keyPress['left'] = true
    }
    if (key === 's') {
        keyPress['down'] = true
    }
    if (key === 'd') {
        keyPress['right'] = true
    }
}

function keyUp(event) {
    let key = event.key
    keyUpScene(key)

    if (key === 'w') {
        keyPress['up'] = false
    }
    if (key === 'a') {
        keyPress['left'] = false
    }
    if (key === 's') {
        keyPress['down'] = false
    }
    if (key === 'd') {
        keyPress['right'] = false
    }
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(gameLoop)
    }
}

function rightClick() {
    return false
}