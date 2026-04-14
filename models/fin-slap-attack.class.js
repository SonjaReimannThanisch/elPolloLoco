class FinSlapAttack extends Attack {

    width = 240;
    height = 240;
    lifetime = 250;
    hasHit = false;
    isImpacting = false;

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
        // this.animate();
    }

    updatePosition() {
        this.otherDirection = this.character.otherDirection;
        let offsetX = this.character.otherDirection ? -1 : 1;
        this.x = this.character.x + offsetX;
        this.y = this.character.y + 30;
    }

    tick(now) {
        this.updatePosition();
        if (!this.lastFrameAt) this.lastFrameAt = now;
        if (now - this.lastFrameAt > 50) {
            this.playAnimation(this.IMAGES_SlapAttack);
            this.lastFrameAt = now;
        }
    }

    hitTarget() {
        this.hasHit = true;
        this.vx = 0;
    }

    // animate() {
    //     const interval = setInterval(() => {
    //         this.updatePosition();
    //         this.playAnimation(this.IMAGES_SlapAttack);

    //         if (this.isExpired()) clearInterval(interval);
    //     }, 1000 / 20);
    // }
}
