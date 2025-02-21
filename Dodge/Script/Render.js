function renderInit() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.lineWidth(2)
}

function renderGameScene() {
    gl.useProgram(program)
    gl.uniform1i(luMode, 0)
    gl.uniform2f(luTranslate, 10.0, 10.0)
    gl.uniform2f(luScale, 20.0, 20.0)
    gl.uniform3f(luColor, 1.0, 1.0, 1.0)
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function renderInitUI() {
}
