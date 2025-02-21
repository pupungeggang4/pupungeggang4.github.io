window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('screen')
    gl = canvas.getContext('webgl2')
    canvasUI = document.createElement('canvas')
    canvasUI.width = 1280
    canvasUI.height = 800
    context = canvasUI.getContext('2d')

    window.addEventListener('keyup', keyUp, false)
    window.addEventListener('keydown', keyDown, false)

    glInit()
    gameInit()

    frameCurrent = Date.now()
    gameLoop = requestAnimationFrame(loop)
}

function loop() {
    framePrevious = frameCurrent
    frameCurrent = Date.now()
    delta = frameCurrent - framePrevious

    loopScene()

    gameLoop = requestAnimationFrame(loop)
}

function keyDown(event) {
    let key = event.key

    if (key === 'w') {
        keyPress['Up'] = true
    }
    if (key === 'a') {
        keyPress['Left'] = true
    }
    if (key === 's') {
        keyPress['Down'] = true
    }
    if (key === 'd') {
        keyPress['Right'] = true
    }

    keyDownScene(key)
}

function keyUp(event) {
    let key = event.key

    if (key === 'w') {
        keyPress['Up'] = false
    }
    if (key === 'a') {
        keyPress['Left'] = false
    }
    if (key === 's') {
        keyPress['Down'] = false
    }
    if (key === 'd') {
        keyPress['Right'] = false
    }

    keyUpScene(key)
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(gameLoop)
    }
}

function rightClick() {
    return false
}
