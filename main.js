let canvas = document.getElementById("canvas")
let context = canvas.getContext("2d")



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
scoreText = document.getElementById("score")
class block {
    pos;
    id;
    direction;
    constructor(pos, id, direction) {
        this.pos = pos;
        this.id = id;
        this.direction = direction;
    }
    draw() {
        context.fillRect(this.pos.x * cellSize - 25, this.pos.y * cellSize - 25, 50, 50)
        context.strokeStyle = "White"
        context.lineWidth = 2
        context.strokeRect(this.pos.x * cellSize - 25, this.pos.y * cellSize - 25, 50, 50)
    }
    move() {
        this.pos = new vector(this.pos.x + this.direction.x, this.pos.y + this.direction.y)
    }
}
class vector {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new vector(this.x + other.x, this.y + other.y);
    }
}

score = 0
cellSize = 50
var snake = [];
snake.push(new block((new vector(5, 5)), "snake", new vector(1, 0)));

window.addEventListener("keydown", e => {
    switch (e.key) {
        case "w":
            if (snake[0].direction.y !== 1) {
                snake[0].direction.y = -1
                snake[0].direction.x = 0
                console.log("w")
            }
            break
        case "a":
            if (snake[0].direction.x !== 1) {
                snake[0].direction.x = -1
                snake[0].direction.y = 0
                console.log("a")
            }
            break
        case "s":
            if (snake[0].direction.y !== -1) {
                snake[0].direction.y = 1
                snake[0].direction.x = 0
                console.log("s")
            }
            break
        case "d":
            if (snake[0].direction.x !== -1) {
                snake[0].direction.x = 1
                snake[0].direction.y = 0
                console.log("d")
            }
            break

    }
})
IsgameOver = false

function gameOver() {
    scoreText.textContent = "You lose with score : " + String(score)
    IsgameOver = true
}

function checkCollision() {
    if (snake.length <= 2) {
        return
    }
    if (snake[0].pos.x + snake[0].direction.x == snake[1].pos.x) {
        if (snake[0].pos.y + snake[0].direction.y == snake[1].pos.y) {
            snake[0].direction.x = snake[0].direction.x * -1
            snake[0].direction.y = snake[0].direction.y * -1
        }
    }
    for (let index = 2; index < snake.length; index++) {
        if (snake[0].pos.x + snake[0].direction.x == snake[index].pos.x) {
            if (snake[0].pos.y + snake[0].direction.y == snake[index].pos.y) {
                gameOver()
                console.log("crash")
            }
        }

    }
}
apple = null
fed = false
applyFood()

function applyFood() {
    isAppleOutside = false
    apple = new block(new vector(getRandomInt(1, 9), getRandomInt(1, 9)), "apple",
        new vector(0, 0))
    while (isAppleOutside == false) {
        isAppleOutside = true
        for (let index = 0; index < snake.length; index++) {
            if (snake[index].pos.x == apple.pos.x) {
                if (snake[index].pos.y == apple.pos.y) {
                    apple = new block(new vector(getRandomInt(1, 9), getRandomInt(1, 9)), "apple",
                        new vector(0, 0))
                    isAppleOutside = false
                }
            }
        }
    }
}

function update() {
    if (IsgameOver) {
        return
    }
    checkCollision()
    context.clearRect(0, 0, 500, 500)
    context.lineWidth = 50
    context.strokeStyle = "Black"
    context.stroke()
    context.strokeRect(0, 0, 500, 500)
    if (snake[0].pos.x == apple.pos.x) {
        if (snake[0].pos.y == apple.pos.y) {
            fed = true
            applyFood()
            score += 1
            scoreText.textContent = String(score)
        }

    };
    snake.unshift(new block((new vector(snake[0].pos.x + snake[0].direction.x, snake[0].pos.y + snake[0].direction.y)),
        "snake",
        snake[0].direction))
    if (fed == false) {
        snake.pop()
    };
    fed = false;

    if (snake[0].pos.x == 0) {
        snake[0].pos.x = 9
    }
    if (snake[0].pos.x == 10) {
        snake[0].pos.x = 1
    }
    if (snake[0].pos.y == 10) {
        snake[0].pos.y = 1
    }
    if (snake[0].pos.y == 0) {
        snake[0].pos.y = 9
    }
    context.fillStyle = "red"
    apple.draw()
    context.fillStyle = "green"
    snake[0].draw()
    context.fillStyle = "black"
    for (let index = 1; index < snake.length; index++) {
        snake[index].draw()
    }

}
setInterval(update, 325)
