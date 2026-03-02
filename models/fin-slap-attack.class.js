class FinSlapAttack extends Attack {

    width = 40;
    height = 100;
    lifetime = 180;

    IMAGES_SlapAttack = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];

    constructor(character) {
        super();
        this.character = character;
        this.loadImages(this.IMAGES_SlapAttack);
        this.img = this.imageCache[this.IMAGES_SlapAttack[0]];
        this.updatePosition();
        this.animate();
    }

    // attack(x, y) {
    //     this.x = x;
    //     this.y = y;
    //     this.speedX = 30;
    // }

    updatePosition() {
        const offsetX = this.character.otherDirection ? -40 : this.character.width - 40;
        this.x = this.character.x + offsetX;
        this.y = this.character.y + (this.character.height / 2) - (this.height / 2);
    }

    animate() {
        const interval = setInterval(() => {
            this.updatePosition();
            this.playAnimation(this.IMAGES_SlapAttack);

            if (this.isExpired()) clearInterval(interval);
        }, 1000 / 20);
    }
}
