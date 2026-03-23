class Endboss extends movableObject {
    height = 600;
    width = 600;
    energy = 100;
    finalX = 4400;
    finalY = -100;
    introSpeedY = 6;

    isAwakened = false;
    isIntroducing = false;
    isActive = false;

    IMAGES_INTRO = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ];

    IMAGES_MOVE = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/dead6.png',
        'img/2.Enemy/3 Final Enemy/Dead/dead7.png',
        'img/2.Enemy/3 Final Enemy/Dead/dead8.png',
        'img/2.Enemy/3 Final Enemy/Dead/dead9.png',
        'img/2.Enemy/3 Final Enemy/Dead/dead10.png'
    ];

    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];

    offset = {
        top: 220,
        left: 35,
        right: 40,
        bottom: 80,
    }

    constructor(x, y) {
        super().loadImage(this.IMAGES_INTRO[0]);
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_MOVE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = this.finalX;
        // this.y = this.finalY;
        this.y = -520;
        this.startAnimationLoop();
    }

    startIntro() {
        if (this.isAwakened) return;
        this.isAwakened = true;
        this.isIntroducing = true;
    }

    update() {
        if (this.isIntroducing) {
            this.y += this.introSpeedY;
            if (this.y >= this.finalY) {
                this.y = this.finalY;
                this.isIntroducing = false;
                this.isActive = true;
            }
        }
    }

    startAnimationLoop(){
        setInterval(() => {
            if ( this.isIntroducing) {
                this.playAnimation(this.IMAGES_INTRO);
            } else if (this.isActive) {
                this.playAnimation(this.IMAGES_MOVE);
            }
        }, 250);
    }

        startAnimationLoop(){
        setInterval(() => {
            if (this.isActive) {
                this.playAnimation(this.IMAGES_MOVE);
            }
        }, 400);

        setInterval(() => {
            if ( this.isIntroducing) {
                this.playAnimation(this.IMAGES_INTRO);
            }
        }, 140);

    }

    isCollidable() {
        return this.isActive;
    }
}