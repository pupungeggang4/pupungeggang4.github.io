function loopScene() {
    if (state === '') {
        field.loop()
        player.move()
        player.collideCheck(field)
    }
    renderScene()
}

function renderScene() {
    renderInit()
    renderInitUI()
    renderUI()
    renderGameScene()
}

function keyDownScene(key) {
    if (state === 'Start' || state === 'GameOver') {
        if (key === 'Enter') {
            startGame()
            state = ''
        }
    }
}

function keyUpScene(key) {
}
