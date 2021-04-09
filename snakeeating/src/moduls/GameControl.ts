import ScorePanel from './ScorePanel'
import Snake from './Snake'
import Food from './Food'


// 控制器，控制其他所有类
class GameControl {
    // 定义三个属性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 创建属性存储蛇的移动方向（按键的方向）
    direction:  string = '';
    // 创建属性记录游戏是否结束
    isLive = true;

    constructor () {
        this.snake = new Snake();
        this.food = new Food();
        // ScorePanel(10,2)  一共10级，每两分升一级
        this.scorePanel = new ScorePanel(10,2);

        this.init();
    }

    // 游戏初始化
    init() {
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keyDownHandler.bind(this))
        // 调用run方法，使蛇移动
        this.run()
    }
    // 创建键盘按下的响应函数
    keyDownHandler(event: KeyboardEvent) {
        console.log(event.key);
        // ArrowUp     IE     UP
        // ArrowRight         Right
        // ArrowDown          Down  
        // ArrowLeft          Left
        // 修改direction属性,检查event.key是否合法
        this.direction = event.key;
    }
    // 创建蛇移动的方法
    run() {
        /**
         * 根据this.direction来使蛇的位置改变
         *  向上 top 减少
         *  向左 left 减少
         */
        let X = this.snake.x;
        let Y = this.snake.y;

        // 根据按键方向修改蛇
        switch (this.direction) {
            case "ArrowUp":
            case "UP":
                // 向上移动
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10
                break;
        }

        // 检查蛇是否吃到食物
        this.checkEat(X, Y)


        // 修改蛇的x和y的值
        try{
            this.snake.x = X;
            this.snake.y = Y;
        }catch(e) {
            // 进入catch，说明出现异常，游戏结束
            alert(e.message + 'GAME OVER!')
            // 将isLive设置为false
            this.isLive = false;
        }

        // 开启定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level-1)*30);
        
    }

    // 定义一个方法，用来检测蛇是否吃到食物
    checkEat(x:number, y:number) {
        if(x === this.food.x && y === this.food.y) {
            // console.log('吃到食物');
            // 食物的位置重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇增加一节
            this.snake.addBody();
        };
    }


}

export default GameControl;