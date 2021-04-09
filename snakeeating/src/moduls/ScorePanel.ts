
// 定义记分牌的类
class ScorePanel {
    // 记录分数和等级
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    LevelEle: HTMLElement;


    // 限制等级
    maxLevel: number;
    // 设置变量表示多少分升级
    upScore: number;

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.LevelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    // 设置加分
    addScore() {
        this.scoreEle.innerHTML = ++this.score + '';
        // 判断分数
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }
    // 提升等级
    levelUp() {
        // 设置等级上限
        if (this.level < this.maxLevel) {
            this.LevelEle.innerHTML = ++this.level + '';
        }
    }
}
// 测试代码
// const scorePanel = new ScorePanel(100, 2)
// scorePanel.addScore();

export default ScorePanel;