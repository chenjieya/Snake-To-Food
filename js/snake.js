const snake = new Snake();
snake.head = null; // 蛇头
snake.tail = null; // 蛇尾

snake.init = function() {
    const snakeHead = SquareFactory.create('SnakeHeade', 1, 3, 'deeppink');
    const snakeBody1 = SquareFactory.create('SnakeBody', 1, 2, 'green');
    const snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    ground.append(snakeHead);
    ground.append(snakeBody1);
    ground.append(snakeBody2);
};

snake.init();