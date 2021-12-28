const game = new Game();
game.timer = null;
game.score = null;
game.init = function() {
    ground.init();
    snake.init();
    createFood();

    document.onkeydown = function(e) {
        // console.log(e.key)
        if(e.key == 'ArrowLeft' && snake.direction != directionNum.right) {
            snake.direction = directionNum.left;
        } else if(e.key == 'ArrowRight' && snake.direction != directionNum.left) {
            snake.direction = directionNum.right;
        } else if(e.key == 'ArrowUp' && snake.direction != directionNum.bottom) {
            snake.direction = directionNum.top;
        } else if(e.key == 'ArrowDown' && snake.direction != directionNum.top) {
            // debugger
            snake.direction = directionNum.bottom;
        }
    }

    document.getElementById('btn').onclick = function() {
        game.start();
    }
};

game.init();

game.start = function() {
    this.timer = setInterval(function() {
        snake.getNextSquare();
    }, intervalTime);
};

game.over = function() {
    clearInterval(this.timer);
    alert(this.score);
};

function createFood() {
    let x = null;
    let y = null;

    let flag = true;

    while(flag) {
        x = Math.floor(Math.random()*(28-1)+1);
        y = Math.floor(Math.random()*(28-1)+1);

        let ok = true;

        // 循环链表
        for(let node = snake.head; node; node = node.next) {
            if(x == node.x && y == node.y) {
                // 食物出现在蛇得身上
                ok = false;
                break;
            }
        }

        if(ok) {
            flag = false;
        }
    }

    const food = SquareFactory.create('Food', x, y, 'red');
    ground.remove(food.x, food.y);
    ground.append(food);
};