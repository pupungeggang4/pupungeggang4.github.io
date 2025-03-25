function loopScene() {
    if (state === '') {
        board.handleTick()
        player.updateScore()
        player.move()
        player.collideCheck(board)
    }
    renderScene()
}

function renderScene() {
    renderInit()
    board.render()
    player.render()

    context.fillStyle = 'Black'
    context.fillRect(0, 760, 80, 40)
    context.fillStyle = 'Yellow'
    context.fillText(`${Math.floor(player.score)}`, 4, 764)

    if (state === 'start') {
        context.fillStyle = 'Black'
        context.fillRect(0, 0, 640, 40)
        context.fillStyle = 'Yellow'
        context.fillText('Press Enter to Start.', 4, 4)
    } else if (state === 'game_over') {
        context.fillStyle = 'Black'
        context.fillRect(0, 0, 640, 40)
        context.fillStyle = 'Yellow'
        context.fillText('Game Over! Press Enter to Restart', 4, 4)
    }
}

function keyDownScene(key) {
    if (state === 'start') {
        if (key === 'Enter') {
            state = ''
        }
    } else if (state === '') {

    } else if (state === 'game_over') {
        if (key === 'Enter') {
            state = 'start'
            board = new Board()
            player = new Player()
        }
    }
}

function keyUpScene(key) {

}