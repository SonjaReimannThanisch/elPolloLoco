class character extends movableObject {

    height = 280;
    width = 200;
    y = 80;
    speed = 10;
    minY = -130;
    maxY;
    lastAttack = 0;
    attackCooldown = 400;
    coins = 0;
    bottle = 0;
    isBubbleAttacking = false;
    bubbleAttackStartedAt = 0;
    bubbleAttackDuration = 400;
    isFinSlapAttacking = false;
    finSlapAttackStartedAt = 0;
    finSlapAttackDuration = 250;

    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png', 
        'img/1.Sharkie/1.IDLE/3.png', 
        'img/1.Sharkie/1.IDLE/4.png', 
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_SWIN = [
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_POISENED = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];

    IMAGES_POIHURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
    ]

    IMAGES_BUBBLEATTACK = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ]

    IMAGES_FINSLAP = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];

    world;

    offset = {
        top: 130,
        left: 35,
        right: 10,
        bottom: 60,
    }

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SWIN);
        this.loadImages(this.IMAGES_POISENED);
        this.loadImages(this.IMAGES_POIHURT);
        this.loadImages(this.IMAGES_BUBBLEATTACK);
        this.loadImages(this.IMAGES_FINSLAP);
        // console.log('FIN SLAP IMAGES', this.IMAGES_FINSLAP);
        // console.log('CACHE CHECK', this.imageCache);
        
        
    }

    animate() {
        let o = this.offset || { top: 0, left: 0, right: 0, bottom: 0 };
        let hitboxHeight = this.height - o.top - o.bottom;
        this.maxY = this.world.canvas.height - hitboxHeight - o.top;

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if (this.world.keyboard.UP && this.y > this.minY) {
                 this.y = Math.max(this.minY, this.y - this.speed);
            }
            if (this.world.keyboard.DOWN && this.y < this.maxY) {
                this.y = Math.min(this.maxY, this.y + this.speed);
            }
            this.world.camera_x = -this.x;
        }, 1000 / 60);

        setInterval(() => {
            let now = Date.now();

            if (this.isFinSlapAttacking) {
                console.log('PLAYING FIN SLAP', this.currentImage);
                
                this.playAnimation(this.IMAGES_FINSLAP);

                if (now - this.finSlapAttackStartedAt > this.finSlapAttackDuration) {
                    this.isFinSlapAttacking = false;
                }
            } else if (this.isBubbleAttacking) {
                this.playAnimation(this.IMAGES_BUBBLEATTACK);

                if (now - this.bubbleAttackStartedAt > this.bubbleAttackDuration) {
                    this.isBubbleAttacking = false;
                }
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_POISENED);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_POIHURT);
            } else if (
                this.world.keyboard.RIGHT ||
                this.world.keyboard.LEFT ||
                this.world.keyboard.UP ||
                this.world.keyboard.DOWN
            ) {
                this.playAnimation(this.IMAGES_SWIN);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 200);

    }

    startBubbleAttackAnimation() {
        this.isBubbleAttacking = true;
        this.bubbleAttackStartedAt = Date.now();
        this.currentImage = 0;
    }

    startFinSlapAttackAnimation() {
        if (this.isFinSlapAttacking) return;
        this.isFinSlapAttacking = true;
        this.finSlapAttackStartedAt = Date.now();
        this.currentImage = 0;
    }
}