class Keyboard extends movableObject {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    A = false;
    ATTACK = false;
    ESC = false;
    
    height = 100;
    width = 165;
    y = 80;

        constructor(canvasWidth, canvasHeight) {
        super();
        this.loadImage('img/6.Botones/Key/arrow keys.png');
        this.x = canvasWidth - this.width - 20;
        this.y = canvasHeight - this.height - 15;

    }
}