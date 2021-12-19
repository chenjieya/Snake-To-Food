const tool = {
    /* 继承 */
    inherit(target, origin) {
        function F() {};
        F.prototype = origin.prototype;
        target.prototype = new F();
        target.prototype.constructor = target;
    },
    /* 扩展 */
    extends(origin) {
        const target = function () {
            // 私有属性的继承
            origin.apply(this, arguments);
        };
        this.inherit(target, origin)
        return target;
    },
    /* 单例 */
    single(origin) {
        const target = (function() {
            let instance;
            return function() {
                if(typeof instance === 'object') {
                    return instance;
                }
                origin && origin.apply(this, arguments);
                instance = this;
            }
        })();

        //  容错，防止不传origin
        origin && this.inherit(target, origin)

        return target;
    },
}


// function Square(x, y, width, height) {
//     this.x = x;
//     this.y = y; 
//     this.height = height;
//     this.width = width;
// };

// Square.prototype.cooline = function() {
//     console.log('ceshijicheng');
// }

// var Food = tool.extends(Square);
// var f = new Food(10, 10, 10, 10);
// var a = new Food(20, 10, 10, 10);
// console.log(f.x);
// console.log(a.x);