class BubbleTrapAttack extends Attack {
    width = 140;
    height = 140;
    lifetime = 500;


    IMAGES_BubbleAttack = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ]

    constructor(character) {
        super();
        this.loadImages(this.IMAGES_BubbleAttack);
        this.character = character;
        this.img = this.imageCache[this.IMAGES_BubbleAttack[0]];
        this.updatePosition();
        this.animate();
    }

    updatePosition() {
        this.otherDirection = this.character.otherDirection 
        let cx = this.character.x + this.character.width / 2;
        let cy = this.character.y + this.character.height / 2;
        this.x = cx - this.width / 2;
        this.y = cy - this.height / 2;
        let push = this.otherDirection ? -40 :40;
        this.x += push;
    }

    tick(now) {
        this.updatePosition();
        if (!this.lastFrameAt) this.lastFrameAt = now;
        if (now - this.lastFrameAt > 50) {
            this.playAnimation(this.IMAGES_BubbleAttack);
            this.lastFrameAt = now;
        }
    }

    // animate() {
    //     const interval = setInterval(() => {
    //         this.updatePosition();
    //         this.playAnimation(this.IMAGES_BubbleAttack);

    //         if (this.isExpired()) {
    //             clearInterval(interval);
    //         }
    //     }, 1000 / 20);
    // }

}