class BubbleTrapAttack extends Attack {
    width = 60;
    height = 60;
    lifetime = 1000;
    hasHit = false;
    isImpacting = false;
    markedForDeletion = false;
    impactSpeed = 0;
    impactEndAt = 0;

    IMAGES_BUBBLE= [
        'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png',
    ];

    IMAGES_BUBBLE_POISEND = [
        'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png',
    ];

    constructor(character, type = 'normal') {
        super();
        this.type = type;
        this.character = character;
        this.otherDirection = this.character.otherDirection;
        this.loadImages(this.IMAGES_BUBBLE);
        this.img = this.imageCache[this.IMAGES_BUBBLE[0]];
        this.setStartPosition();
        this.vx = this.otherDirection ? -(8 + Math.random() * 4) : (8 + Math.random() * 4);
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

        if (this.isImpacting) {
            this.x += this.impactSpeed;

            if (now >= this.impactEndAt) {
                this.impactSpeed = 0;
            }

            this.width += 0.2;
            this.height += 0.2;
        }
    }

    hitTarget() {
        this.hasHit = true;
        this.isImpacting = true;
        this.impactSpeed = this.otherDirection ? -2 : 2;
        this.impactEndAt = Date.now() + 120;
        setTimeout(() => {
            this.vx = 0;
            this.markedForDeletion = true;
        }, 180);
    }
}