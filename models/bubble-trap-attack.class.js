class BubbleTrapAttack extends Attack {
    width = 40;
    height = 100;
    lifeline = 120;


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

    constructor() {
        super();
        this.mainCharacter = mainCharacter;
        this.img = this.imageCache[this.IMAGES_BubbleAttack[0]];
        this.updatePosition();
        this.animate();
    }

    updatePosition() {
        let offsetX = this.mainCharacter.otherDirection ? -40 : this.mainCharacter.width - 40;
        this.x = this.mainCharacter.x + offsetX;
        this.y = this.mainCharacter.y + (this.mainCharacter.height / 2) - (this.height / 2);
    }

    animate() {
        const interval = setInterval(() => {
            this.updatePosition();
            this.playAnimation(this.IMAGES_BubbleAttack);

            if (this.isExpired()) {
                clearInterval(interval);
            }
        }, 1000 / 20);
    }

}