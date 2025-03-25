let canvas
let context

let gameLoop
let frameCurrent
let framePrevious
let delta

let state = 'start'

let keyPress = {
    'up': false, 'left': false, 'down': false, 'right': false
}
let player
let field