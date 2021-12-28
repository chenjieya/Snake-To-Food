/* 
    主要用来声明一些全局性的（变量，函数）
*/

// 行，列
const th = 30; // 行
const tr = 30; // 列

// 方块大小（正方形）
const squareWidth = 15; // 宽高

// 场景的位置
const positionX = 200; // 横坐标
const posiitonY = 100; // 纵坐标

// 蛇移动的时间间隔
const intervalTime = 300; 

/**
 * 
 * @param {Number} x 方块横坐标 
 * @param {Number} y 方块纵坐标 
 * @param {Number} width 方块的宽 
 * @param {Number} height 方块的高
 * @param {Object} dom 元素
 */
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}

/**
 * 蛇头是单例创建的，此函数更新蛇头移动时候的位置
 * @param {Number} x 行
 * @param {Number} y 列
 */
Square.prototype.upDate = function(x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = y * squareWidth + 'px';
    this.viewContent.style.top = x * squareWidth + 'px';
}

const Ground = tool.single(Square); // 游戏视图
const Floor = tool.extends(Square); // 地板
const Wall = tool.extends(Square); // 围墙
const SnakeHeade = tool.single(Square); // 蛇头
const SnakeBody = tool.extends(Square); // 蛇身
const Food = tool.single(Square); // 食物
const Snake = tool.single(); // 蛇
const Game = tool.single(); // 控制游戏

// 蛇的状态
const snakeState = {
    eat: 'eat',
    die: 'die',
    move: 'move',
}