let canvas
let gl
let canvasUI
let context

let program, vShader, fShader
let laPosition, laTexcoord
let luMode, luTranslate, luColor
let vao, vbo, gt

let gameLoop
let frameCurrent
let framePrevious
let delta

let keyPress = {
    'Up': false, 'Left': false, 'Down': false, 'Right': false
}

let state = 'Start'

let score = 0
let player
let field
