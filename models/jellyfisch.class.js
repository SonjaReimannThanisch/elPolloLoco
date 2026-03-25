class jellyfisch extends movableObject {

    height = 80;
    width = 80;
    isDead = false;
    markedForDeletion = false;
    energy = 100;

    IMAGES_MOVE_LILA = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila4.png',
    ];

    IMAGES_MOVE_YELLOW = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow_1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow_2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow_3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow_4.png',
    ];

    IMAGES_DEAD_GREEN = [
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png',
    ];

    IMAGES_DEAD_LILA = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
    ];

    // IMAGES_DEAD_PINK = [
    //     'img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
    //     'img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
    //     'img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
    //     'img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png',
    // ];

    IMAGES_DEAD_YELLOW = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
    ]

    IMAGES_REGULAR_DEATHL = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila4.png',
    ];

    IMAGES_REGULAR_DEATHY = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow_1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow_2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow_3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow_4.png',
    ];

    IMAGES_SUPER_DEATHG = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ];

    IMAGES_SUPER_DEATHP = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png',
    ];

    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5,
    }

    constructor(color = 'lila') {
        super()
        this.type = color;
        this.isDead = true;
        // console.log('JELLY TYPE', this.type);
        this.images = (color === 'yellow') ? this.IMAGES_MOVE_YELLOW : this.IMAGES_MOVE_LILA;
        this.loadImage(this.images[0]);
        this.loadImages(this.images);
        this.loadImages(this.IMAGES_DEAD_LILA);
        this.loadImages(this.IMAGES_DEAD_GREEN);
        // this.loadImages(this.IMAGES_DEAD_PINK);
        this.loadImages(this.IMAGES_DEAD_YELLOW);
        this.loadImages(this.IMAGES_REGULAR_DEATHL);
        this.loadImages(this.IMAGES_REGULAR_DEATHY);
        this.loadImages(this.IMAGES_SUPER_DEATHG);
        this.loadImages(this.IMAGES_SUPER_DEATHP);
        this.x = 890 + Math.random() * 500;
        this.y = 100 + Math.random() * 200;
        this.speed = 0.3 + Math.random() * 0.5;
        this.animate();
        setTimeout(() => {
            this.hit();
        }, 1000);
    }

    hit() {
        if ( this.isDead) return;
        this.energy -= 100;
        if ( this.energy <= 0) {
            this.isDead = true;
            this.speed = 0;
            setTimeout(() => {
                this.markedForDeletion = true;
            }, 500);
        }
    }

    animate(){
        setInterval(() => {
            if (!this.isDead) {
                this.x -= this.speed;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.getDieImages());
            } else {
                this.playAnimation(this.images);
            }
        }, 200);
    }

        getDieImages() {
        if (this.type === 'pink') return this.IMAGES_DEAD_PINK;
        if (this.type === 'lila') return this.IMAGES_DEAD_LILA;
        // if (this.type === 'green') return this.IMAGES_DEAD_GREEN;
        // if (this.type === 'yellow') return this.IMAGES_DEAD_YELLOW;
        // if (this.type === 'green') return this.IMAGES_REGULAR_DEATHL;
        // if (this.type === 'yellow') return this.IMAGES_REGULAR_DEATHY;
        if (this.type === 'green') return this.IMAGES_SUPER_DEATHG;
        if (this.type === 'yellow') return this.IMAGES_SUPER_DEATHP;
    }

}