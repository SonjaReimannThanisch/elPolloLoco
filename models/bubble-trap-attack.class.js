class BubbleTrapAttack extends Attack {
    width = 60;
    height = 60;
    lifetime = 1000;
    hasHit = false;
    isImpacting = false;
    markedForDeletion = false;

    IMAGES_BUBBLE= [
        'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png',
    ]

    constructor(character) {
        super();
        this.character = character;
        this.otherDirection = this.character.otherDirection;
        this.loadImages(this.IMAGES_BUBBLE);
        this.img = this.imageCache[this.IMAGES_BUBBLE[0]];
        this.setStartPosition();
        this.vx = this.otherDirection ? -8 : 8;
    }

    updatePosition() {
        this.otherDirection = this.character.otherDirection 
        let cx = this.character.x + this.character.width / 2;
        let cy = this.character.y + this.character.height / 2;
        this.x = cx - this.width / 2;
        this.y = cy - this.height / 2;
        let push = this.otherDirection ? -120 : 120;
        this.x += push;
    }

    setStartPosition() {
        this.otherDirection = this.character.otherDirection;

        this.x = this.character.x + this.character.width - 10;
        this.y = this.character.y + this.character.height / 2;

        if (this.otherDirection) {
            this.x = this.character.x - this.width + 10;
        }
    }

    tick(now) {
        if (!this.lastFrameAt) this.lastFrameAt = now;
        if (now - this.lastFrameAt > 50) {

            this.playAnimation(this.IMAGES_BUBBLE);
            this.lastFrameAt = now;
        }
    }

    hitTarget() {
        this.hasHit = true;
        //  
        this.vx = 0;
        setTimeout(() => {
            this.markedForDeletion = true;
        }, 200);
    }
}