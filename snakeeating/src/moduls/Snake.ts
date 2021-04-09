// 蛇的类
class Snake {
    // 表示蛇头的元素
    head: HTMLElement;
    // 蛇的身体
    bodies: HTMLCollection;
    // 蛇的容器
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('snake')!;

        this.head = document.querySelector('#snake > div') as HTMLElement;

        this.bodies = this.element.getElementsByTagName('div');

    }
    // 获取蛇的坐标（头）
    get x() {
        return this.head.offsetLeft;
    }
    get y() {
        return this.head.offsetTop;
    }
    // 设置蛇头的坐标
    set x(value: number) {
        // 如果新值和旧值相同则直接返回不再修改
        if (this.x === value) {
            return
        }
        // x 的合法范围0-290之间
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了，抛出异常
            throw new Error('蛇撞墙了！')
        }

        // 修改x值是在修改水平坐标，蛇在左右移动，蛇在向左移动的时候不能向右掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 如果发生掉头，让蛇向反方向继续移动
            if (value > this.x) {
                // 如果新值value大于旧值x，则说明蛇在向右走，姿势发生掉头，应该使蛇继续向右走
                value = this.x - 10;
            }else {
                value = this.x + 10;
            }
        }

        // 移动身体
        this.moveBody();

        this.head.style.left = value + 'px';

        // 检查是否撞到自己
        this.checkHeadBody()
    }
    set y(value:number) {
        if (this.y === value) {
            return
        }
        // x 的合法范围0-290之间
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了！')
        }

        // 修改y值是在修改垂直坐标，蛇在上下移动，蛇在向上移动的时候不能向下掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 如果发生掉头，让蛇向反方向继续移动
            if (value > this.y) {
                // 如果新值value大于旧值y，则说明蛇在向下走，姿势发生掉头，应该使蛇继续向右下走
                value = this.y - 10;
            }else {
                value = this.y + 10;
            }
        }


        // 移动身体
        this.moveBody();

        this.head.style.top = value + 'px';

        // 检查是否撞到自己
        this.checkHeadBody()
    }
    // 设置蛇增加身体的方法
    addBody() {
        this.element.insertAdjacentHTML('beforeend', "<div></div>")
    }
    // 添加蛇身体移动的方法
    moveBody() {
        /**
         * 将后边的身体设置为前边身体的位置
         *      ：第四节 = 第三节的位置
         *      第三节 = 第二节的位置  ...
         */

        // 遍历所有的身体
        for(let i = this.bodies.length - 1; i > 0; i --) {
            // 获取前边身体的位置i
            let x = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i-1] as HTMLElement).offsetTop;

            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = x + 'px';
            (this.bodies[i] as HTMLElement).style.top = y + 'px';
        }

    }
    // 用来检查蛇头撞到身体的方法
    checkHeadBody() {
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.x === bd.offsetLeft && this.y === bd.offsetTop) {
                // 进入判断说明蛇头撞到身体，游戏结束
                throw new Error('撞到自己了!')
            }
            
        }
    }
}


export default Snake;