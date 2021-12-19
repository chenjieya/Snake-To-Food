// 1. 创建管理者
function SquareFactory() {

};

/**
 * 
 * @param {Object} square 创造方块的实列
 * @param {String} color 方块的颜色
 */
SquareFactory.prototype.init = function(square, color) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.background = color;

    /* 
    位置：
        x(行) y(列)
        x*height
        y*width
    */
    square.viewContent.style.left = square.y * squareWidth + 'px';
    square.viewContent.style.top = square.x * squareWidth + 'px';
};

// 2. 包装创建方块的构造函数（流水线）
/**
 * 
 * @param {Number} x 行
 * @param {Number} y 列
 * @param {String} color 方块的颜色
 */
SquareFactory.prototype.Wall = function(x, y, color) {
    const wall = new Wall(x, y, squareWidth, squareWidth);
    this.init(wall, color);
    return wall;
};

SquareFactory.prototype.Floor = function(x, y, color) {
    const floor = new Floor(x, y, squareWidth, squareWidth);
    this.init(floor, color);
    return floor;
};

SquareFactory.prototype.SnakeHeade = function(x, y, color) {
    const snakeHeade = new SnakeHeade(x, y, squareWidth, squareWidth);
    this.init(snakeHeade, color);
    return snakeHeade;
};

SquareFactory.prototype.SnakeBody = function(x, y, color) {
    const snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    this.init(snakeBody, color);
    return snakeBody;
};

SquareFactory.prototype.Food = function(x, y, color) {
    const food = new Food(x, y, squareWidth, squareWidth);
    this.init(food, color);
    return food;
};

// 3. 对外的接口
SquareFactory.create = function(type, x, y, color) {
    if(typeof SquareFactory.prototype[type] == 'undefined') {
        throw 'no your type';
    }

    SquareFactory.prototype[type].prototype = new SquareFactory();

    return new SquareFactory.prototype[type](x, y, color);
};

// const newSquare = SquareFactory.create('Wall', 1, 1, 'gray')  // 在坐标1，1的位置创建灰色的墙
// console.log(newSquare);