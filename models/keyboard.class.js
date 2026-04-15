class Keyboard extends movableObject {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    A = false;
    ESC = false;
    T = false;
    Y = false;
    
    height = 100;
    width = 165;
    y = 80;

        constructor(canvasWidth, canvasHeight) {
        super();
        this.x = canvasWidth - this.width - 20;
        this.y = canvasHeight - this.height - 15;

    }
}