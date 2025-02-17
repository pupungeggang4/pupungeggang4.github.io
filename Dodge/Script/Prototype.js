class Player {
    rect = null
    speed = 240

    constructor() {
        this.rect = new Rect2D(640, 400, 32, 32)
    }

    render() {
        gl.uniform3f(luColor, 0.0, 1.0, 0.0)
        gl.uniform2f(luScale, this.rect.size.x, this.rect.size.y)
        gl.uniform2f(luTranslate, this.rect.position.x, this.rect.position.y)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    move() {
        if (keyPress['Up'] == true) {
            if (this.rect.position.y > 0) {
                this.rect.position.y -= this.speed * delta / 1000
            }
        }
        if (keyPress['Left'] == true) {
            if (this.rect.position.x > 0) {
                this.rect.position.x -= this.speed * delta / 1000
            }
        }
        if (keyPress['Down'] == true) {
            if (this.rect.position.y < 800) {
                this.rect.position.y += this.speed * delta / 1000
            }
        }
        if (keyPress['Right'] == true) {
            if (this.rect.position.x < 1280) {
                this.rect.position.x += this.speed * delta / 1000
            }
        }
    }

    collideCheck(field) {
        for (let i = 0; i < field.bullets.length; i++) {
            if (distanceTwoPoint(this.rect.position, field.bullets[i].rect.position) < 24) {
                state = 'GameOver'
                return
            }
        }
    }
}

class Field {
    bullets = []
    spawnTime = 0

    constructor() {
    }

    start() {
        score = 0
        this.spawnTime = 0.5
        this.bullets = []
    }

    loop() {
        score += delta / 1000
        if (this.spawnTime < 0) {
            this.spawnTime = 0.5
            this.spawn(Math.min(Math.ceil(score / 10), 5))
        } else {
            this.spawnTime -= delta / 1000
        }

        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].move()
        }

        this.despawn()
    }

    spawn(num) {
        for (let i = 0; i < num; i++) {
            let direction = Math.floor(Math.random() * 4)
            this.bullets.push(new Bullet(direction))
        }
    }

    despawn() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            if (this.bullets[i].rect.position.x > 1380 || this.bullets[i].rect.position.x < -100 || this.bullets[i].rect.position.y > 900 || this.bullets[i].rect.position.y < -100) {
                this.bullets.splice(i, 1)
            }
        }
    }

    render() {
        gl.uniform3f(luColor, 1.0, 1.0, 1.0)
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].render()
        }
    }
}

class Bullet {
    rect = null
    direction = ''
    speed = 200

    constructor(d) {
        this.speed = 240 + Math.random() * 120
        if (d === 0) {
            this.rect = new Rect2D(Math.random() * 1280, -20, 16, 16)
            this.direction = 'D'
        } else if (d === 1) {
            this.rect = new Rect2D(-20, Math.random() * 800, 16, 16)
            this.direction = 'R'
        } else if (d === 2) {
            this.rect = new Rect2D(1300, Math.random() * 800, 16, 16)
            this.direction = 'L'
        } else if (d === 3) {
            this.rect = new Rect2D(Math.random() * 1280, 820, 16, 16)
            this.direction = 'U'
        }
    }

    render() {
        gl.uniform2f(luScale, this.rect.size.x, this.rect.size.y)
        gl.uniform2f(luTranslate, this.rect.position.x, this.rect.position.y)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    move() {
        if (this.direction === 'D') {
            this.rect.position.y += this.speed * delta / 1000    
        } else if (this.direction === 'R') {
            this.rect.position.x += this.speed * delta / 1000
        } else if (this.direction === 'L') {
            this.rect.position.x -= this.speed * delta / 1000    
        } else if (this.direction === 'U') {
            this.rect.position.y -= this.speed * delta / 1000
        }
    }
}
