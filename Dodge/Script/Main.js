window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('Screen')
    gl = canvas.getContext('webgl2')
    canvasUI = document.createElement('canvas')
    canvasUI.width = 1280
    canvasUI.height = 800
    context = canvas.getContext('2d')

    window.addEventListener('keyup', keyUp, false)
    window.addEventListener('keydown', keyDown, false)

    glInit()

    frameCurrent = Date.now()
    gameLoop = requestAnimationFrame(loop)
}

function loop() {
    framePrevious = Date.now()
    frameCurrent = framePrevious
    delta = frameCurrent - framePrevious

    loopScene()

    gameLoop = requestAnimationFrame(loop)
}

function keyUp(event) {
}

function keyDown(event) {
}

function errorHandle() {
}

function rightClick() {
    return false
}
