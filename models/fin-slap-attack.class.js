class FinSlapAttack extends Attack {

    width = 140;
    height = 140;
    lifetime = 350;

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

    updatePosition() {
        this.otherDirection = this.character.otherDirection;
        let cx = this.character.x + this.character.width / 2;
        let cy = this.character.y + this.character.height / 2;
        this.x = cx - this.width / 2;
        this.y = cy - this.height / 2;
        let push = this.otherDirection ? -30 :30;
        this.x += push;
    }

    animate() {
        const interval = setInterval(() => {
            this.updatePosition();
            this.playAnimation(this.IMAGES_SlapAttack);

            if (this.isExpired()) clearInterval(interval);
        }, 1000 / 20);
    }
}
