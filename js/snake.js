const snake = new Snake();
snake.head = null; // 蛇头
snake.tail = null; // 蛇尾

/* 
    蛇走向的规则
*/
const directionNum = {
    left: {
        y: -1,
        x: 0
    }, 
    right: {
        y: 1,
        x: 0,
    },
    bottom: {
        y: 0,
        x: 1,
    },
    top: {
        y: 0,
        x: -1
    }
}

snake.init = function() {
    const snakeHead = SquareFactory.create('SnakeHeade', 1, 3, 'deeppink');
    const snakeBody1 = SquareFactory.create('SnakeBody', 1, 2, 'green');
    const snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    snake.head = snakeHead;
    snake.tail = snakeBody2;

    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    // 蛇头，蛇身体，蛇尾之间的连接
    snakeHead.last = null;
    snakeHead.next = snakeBody1;

    snakeBody1.last = snakeHead;
    snakeBody1.next = snakeBody2;

    snakeBody2.last = snakeBody1;
    snakeBody2.next = null;

    this.direction = directionNum.right; // 蛇默认向右走
};

/* 
    获取蛇头要走的下一个方块是什么
*/
snake.getNextSquare = function () {
    let nextSquare = ground.squareTable[this.head.x + this.direction.x][this.head.y + this.direction.y];
    // console.log(nextSquare);

    this.collideMethod[nextSquare.collide](nextSquare);
}

snake.collideMethod = {
    move(square, boolean) {
        const newSnakeBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');
        
        // 更新链表
        newSnakeBody.next = snake.head.next;
        newSnakeBody.last = null;
        snake.head.next = newSnakeBody;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newSnakeBody);

        const newSnakeHead = SquareFactory.create('SnakeHeade', square.x, square.y, 'deepPink');

        // 更新链表
        newSnakeHead.last = null;
        newSnakeHead.next = newSnakeBody;
        newSnakeBody.last = newSnakeHead;

        ground.remove(square.x, square.y);
        ground.append(newSnakeHead);

        snake.head = newSnakeHead; // 更新蛇头

        if(!boolean) {
            // 我们需要删除尾巴
            const newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'grey');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            snake.tail = snake.tail.last;
        }
    },
    eat(square) {
        // 吃和移动的区别就在于，是否删除尾巴
        this.move(square, true);
    },
    die() {},
}

snake.init();
snake.getNextSquare();