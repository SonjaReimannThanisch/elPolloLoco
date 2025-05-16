class movableObject {
    X =120;
    y = 400;
    width = 100;
    height = 150;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        if (this.img && ctx) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    moveRight() {
        console.log('Move to the Right');
        
    }
}