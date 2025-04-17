class movableObject {
    X =120;
    y = 400;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = "./img/1.Sharkie/1.IDLE/1.png";
    }

    moveRight() {
        console.log('Move Right');
        
    }
}