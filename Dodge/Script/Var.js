let canvas
let gl
let canvasUI
let context

let program, vShader, fShader
let laPosition, laTexcoord
let luMode, luTranslate, luColor
let vao, vbo

let gameLoop
let frameCurrent
let framePrevious
let delta

let state = 'Start'
