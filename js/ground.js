const ground = new Ground(positionX, posiitonY, th * squareWidth, tr * squareWidth);
ground.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.background = 'red';

    document.body.appendChild(this.viewContent);

    // 因为蛇得身体是涨得（记录一下所有方块得位置,二维数组）
    this.squareTable = [
        // [],
        // [],
    ];

    for(let i = 0; i < th; i++) {
        this.squareTable[i] = new Array(tr);
        for(let j = 0; j < tr; j++) {
            if(i == 0 || i == th-1 || j == 0 || j == tr-1) {
                // 临界（围墙）
                var newSquare = SquareFactory.create('Wall', i, j, 'black');
            } else {
                // 地板
                var newSquare = SquareFactory.create('Floor', i, j, 'grey');
            }
            
            this.viewContent.appendChild(newSquare.viewContent);
            this.squareTable[i][j] = newSquare;
        }
    }
}

ground.init();
ground.remove = function(x, y) {
    const curSquare = this.squareTable[x][y];

    this.viewContent.removeChild(curSquare.viewContent);
    this.squareTable[x][y] = null;
    // console.log(this.squareTable)
};
ground.append = function(square) {
    this.viewContent.appendChild(square.viewContent);
    this.squareTable[square.x][square.y] = square;
};

// ground.remove(0, 1);
// ground.append(SquareFactory.create('Floor', 10, 1, 'red'))


