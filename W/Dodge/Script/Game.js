function gameInit() {
    player = new Player()
    field = new Field()
}

function startGame() {
    player.rect.position = new Vector2D(640, 400)
    field.start()
}
