function renderInit() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.lineWidth(2)
}

function renderGameScene() {
    gl.useProgram(program)
    gl.uniform1i(luMode, 0)
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    player.render()
    field.render()

    gl.uniform1i(luMode, 1)
    gl.bindTexture(gl.TEXTURE_2D, gt)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvasUI)
    gl.uniform2f(luTranslate, 640, 400)
    gl.uniform2f(luScale, 1280, 800)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function renderInitUI() {
    context.font = '32px neodgm'
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.fillStyle = 'Yellow'
    context.clearRect(0, 0, 1280, 800)
}

function renderUI() {
    if (state === 'Start') {
        context.fillText(`Press Enter to start.`, UI.text[0], UI.text[1])
    } else if (state === '') {
        context.fillText(Math.floor(score), UI.text[0], UI.text[1])
        context.fillText(`Num of bullets: ${field.bullets.length}`, UI.text2[0], UI.text2[1])
    } else if (state === 'GameOver') {
        context.fillText(`Game over! Press Enter to restart. Score: ${Math.floor(score)}`, UI.text[0], UI.text[1])
    }
}
