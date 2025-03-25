class Board {
    constructor() {
        this.cell = []
        for (let i = 0; i < 40; i++) {
            let temp = []
            for (let j = 0; j < 64; j++) {
                temp.push(0)
            }
            this.cell.push(temp)
        }
        this.nextTime = 0.15
        this.nextFlipTime = 1
        this.nextGlider = [1, 62]
    }

    proceed() {
        let next = JSON.parse(JSON.stringify(this.cell))
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 64; j++) {
                let ncount = 0
                for (let k = 0; k < 8; k++) {
                    let nrow = i + neighbor[k][0]
                    let ncol = j + neighbor[k][1]
                    if (nrow >= 0 && nrow < 40 && ncol >= 0 && ncol < 64) {
                        if (this.cell[nrow][ncol] === 1) {
                            ncount += 1
                        }
                    }
                }
                if (this.cell[i][j] === 0) {
                    if (ncount === 3) {
                        next[i][j] = 1
                    } else {
                        next[i][j] = 0
                    }
                } else if (this.cell[i][j] === 1) {
                    if (ncount != 2 && ncount != 3) {
                        next[i][j] = 0
                    } else {
                        next[i][j] = 1
                    }
                }
            }
        }
        this.cell = next
    }

    flipCell(row, col) {
        this.cell[row][col] = 1 - this.cell[row][col]
    }

    randomFlip(rs, cs, re, ce, p) {
        for (let i = rs; i <= re; i++) {
            for (let j = cs; j <= ce; j++) {
                if (i >= 0 && i < 40 && j >= 0 && j < 64) {
                    let num = Math.random()
                    if (num <= p) {
                        this.flipCell(i, j)
                    }
                }
            }
        }
    }

    spawnGlider(row, col) {
        let d = Math.floor(Math.random() * 4)
        if (d === 0) {
            this.cell[row - 1][col] = 1
            this.cell[row][col + 1] = 1
            this.cell[row + 1][col - 1] = 1
            this.cell[row + 1][col] = 1
            this.cell[row + 1][col + 1] = 1
        } else if (d === 1) {
            this.cell[row - 1][col - 1] = 1
            this.cell[row - 1][col] = 1
            this.cell[row - 1][col + 1] = 1
            this.cell[row][col - 1] = 1
            this.cell[row + 1][col] = 1
        } else if (d === 2) {
            this.cell[row - 1][col - 1] = 1
            this.cell[row][col - 1] = 1
            this.cell[row][col + 1] = 1
            this.cell[row + 1][col - 1] = 1
            this.cell[row + 1][col] = 1
        } else if (d === 3) {
            this.cell[row - 1][col] = 1
            this.cell[row - 1][col + 1] = 1
            this.cell[row][col - 1] = 1
            this.cell[row][col + 1] = 1
            this.cell[row + 1][col + 1] = 1
        }
    }

    handleTick() {
        this.nextTime -= delta / 1000
        this.nextFlipTime -= delta / 1000

        if (this.nextTime < 0) {
            this.proceed()
            this.nextTime = 0.12
        }

        if (this.nextFlipTime < 0) {
            this.spawnGlider(this.nextGlider[0], this.nextGlider[1])
            this.nextGlider = [Math.floor(Math.random() * 38) + 1, Math.floor(Math.random() * 62) + 1]
            this.nextFlipTime = 0.8
        }
    }

    render() {
        context.fillStyle = 'White'
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 64; j++) {
                if (this.cell[i][j] === 1) {
                    context.fillRect(20 * j, 20 * i, 20, 20)
                }
            }
        }
        context.fillStyle = 'Magenta'
        context.fillRect(20 * this.nextGlider[1], 20 * this.nextGlider[0], 20, 20)
    }
}

class Player {
    constructor() {
        this.rect = new Rect2D(640, 400, 32, 32)
        this.speed = 320
        this.score = 0
    }

    move() {
        if (keyPress['up'] === true) {
            this.rect.position.y -= this.speed * delta / 1000
        }
        if (keyPress['left'] === true) {
            this.rect.position.x -= this.speed * delta / 1000
        }
        if (keyPress['down'] === true) {
            this.rect.position.y += this.speed * delta / 1000
        }
        if (keyPress['right'] === true) {
            this.rect.position.x += this.speed * delta / 1000
        }

        if (this.rect.position.x < 16) {
            this.rect.position.x = 16
        }

        if (this.rect.position.x > 1264) {
            this.rect.position.x = 1264
        }

        if (this.rect.position.y < 16) {
            this.rect.position.y = 16
        }

        if (this.rect.position.y > 782) {
            this.rect.position.y = 782
        }
    }

    collideCheck(board) {
        let u = Math.floor((this.rect.position.y - this.rect.size.y / 2) / 20)
        let d = Math.floor((this.rect.position.y + this.rect.size.y / 2) / 20)
        let l = Math.floor((this.rect.position.x - this.rect.size.x / 2) / 20)
        let r = Math.floor((this.rect.position.x + this.rect.size.x / 2) / 20)
    
        for (let i = u; i <= d; i++) {
            for (let j = l; j <= r; j++) {
                if (i >= 0 && i < 40 && j >= 0 && j < 64) {
                    if (board.cell[i][j] === 1) {
                        state = 'game_over'
                    }
                }
            }
        }
    }

    updateScore() {
        this.score += delta / 1000
    }

    render() {
        context.fillStyle = 'Cyan'
        context.fillRect(this.rect.position.x - this.rect.size.x / 2, this.rect.position.y - this.rect.size.y / 2, this.rect.size.x, this.rect.size.y)
    }
}

class Vector2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Rect2D {
    constructor(x, y, w, h) {
        this.position = new Vector2D(x, y)
        this.size = new Vector2D(w, h)
    }
}