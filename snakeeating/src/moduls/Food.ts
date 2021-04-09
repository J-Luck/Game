// 定义食物类
class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;

    constructor() {
        // 获取页面中的food元素，并将其赋值给element
        this.element = document.getElementById('food')!;
    }

    // 定义获取食物x轴坐标的方法
    get x() {
        return this.element.offsetLeft;
    }
    // 定义获取食物y轴坐标的方法
    get y() {
        return this.element.offsetTop;
    }
    // 定义食物的位置
    change() {
        // 生成随机位置 最小0  最大290
        // 蛇移动一次就是一格，一格的大小是10，所以要求食物的坐标必须是整10
        let top =  Math.round(Math.random() * 29) * 10
        let left =  Math.round(Math.random() * 29) * 10
        
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }

}

// const food = new Food();
// food.change()
// console.log(food.x, food.y);

export default Food;
