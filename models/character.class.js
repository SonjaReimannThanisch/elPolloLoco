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
    isChargingBubble = false;
    isBubbleAttacking = false;
    bubbleAttackStartedAt = 0;
    bubbleAttackDuration = 500;
    isFinSlapAttacking = false;
    finSlapAttackStartedAt = 0;
    finSlapAttackDuration = 500;
    lastActionTime = Date.now();
    lastDamageType = 'poison';
    deathCause = '';
    isCinematicDead = false;
    movementInterval = null;
    animationInterval = null;

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

    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png',
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
    ];

    IMAGES_ELECTROHURT = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ];

    IMAGES_ELECTRODEAD = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png',
     
    ];

    IMAGES_BUBBLEATTACK = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];

    IMAGES_FINSLAP = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];

    IMAGES_WHALE_ATTACK_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ];

    IMAGES_WHALE_ATTACK = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/8.png',
    ];

    IMAGES_DEAD_CINEMATIC = [
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00000.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00001.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00002.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00003.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00004.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00005.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00006.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00007.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00008.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00009.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00010.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
    ]

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
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_SWIN);
        this.loadImages(this.IMAGES_POISENED);
        this.loadImages(this.IMAGES_POIHURT);
        this.loadImages(this.IMAGES_ELECTROHURT);
        this.loadImages(this.IMAGES_ELECTRODEAD);
        this.loadImages(this.IMAGES_BUBBLEATTACK);
        this.loadImages(this.IMAGES_FINSLAP);
        this.loadImages(this.IMAGES_WHALE_ATTACK);
        this.loadImages(this.IMAGES_WHALE_ATTACK_BUBBLE);
        this.loadImages(this.IMAGES_DEAD_CINEMATIC);
    }

    animate() {
        this.setMaxY();
        this.startMovementLoop();
        this.startAnimationLoop();
    }

    setMaxY() {
        let o = this.offset || { top: 0, left: 0, right: 0, bottom: 0 };
        let hitboxHeight = this.height - o.top - o.bottom;
        this.maxY = this.world.canvas.height - hitboxHeight - o.top;
    }

    startMovementLoop() {
        if (this.movementInterval) return;
        this.movementInterval = setInterval(() => {
            this.moveRight();
            this.moveLeft();
            this.moveUp();
            this.moveDown();
            this.world.camera_x = -this.x;
        }, 1000 / 60);
    }

    startAnimationLoop() {
        if (this.animationInterval) return;
        this.animationInterval = setInterval(() => {
            this.handleAnimations();
        }, 80);
    }

    moveRight() {
        if (!this.world.keyboard.RIGHT) return;
        if (this.x >= this.world.level.level_end_x) return;
        this.x += this.speed;
        this.otherDirection = false;
        this.world.hasPlayerMoved = true;
        this.lastActionTime = Date.now();
    }

    moveLeft() {
        if (!this.world.keyboard.LEFT) return;
        if (this.x <= 0) return;
        this.x -= this.speed;
        this.otherDirection = true;
        this.world.hasPlayerMoved = true;
        this.lastActionTime = Date.now();
    }

    moveUp() {
        if (!this.world.keyboard.UP) return;
        if (this.y <= this.minY) return;
        this.y = Math.max(this.minY, this.y - this.speed);
        this.world.hasPlayerMoved = true;
        this.lastActionTime = Date.now();
    }

    moveDown() {
        if (!this.world.keyboard.DOWN) return;
        if (this.y >= this.maxY) return;
        this.y = Math.min(this.maxY, this.y + this.speed);
        this.world.hasPlayerMoved = true;
        this.lastActionTime = Date.now();
    }

    handleAnimations() {
        let now = Date.now();
        if (this.handleFinSlap(now)) return;
        if (this.handleBubble(now)) return;
        if (this.handleCinematicDeath()) return;
        if (this.handleDeath()) return;
        if (this.handleHurt()) return;
        if (this.handleMovement()) return;
        this.handleIdle();
    }

    handleFinSlap(now) {
        if (!this.isFinSlapAttacking) return false;
        this.playAnimation(this.IMAGES_FINSLAP);
        if (now - this.finSlapAttackStartedAt > this.finSlapAttackDuration) {
            this.isFinSlapAttacking = false;
        }
        return true;
    }

    handleBubble(now) {
        if (this.isChargingBubble) {
            this.playAnimation(this.IMAGES_WHALE_ATTACK);
            if (now - this.bubbleAttackStartedAt > 300) {
                this.isChargingBubble = false;
                this.isBubbleAttacking = true;
                this.bubbleAttackStartedAt = now;
            }
            return true;
        }
        if (this.isBubbleAttacking) {
            if (this.bubbleAttackType === 'poison') {
                this.playAnimation(this.IMAGES_WHALE_ATTACK_BUBBLE);
            } else {
                this.playAnimation(this.IMAGES_BUBBLEATTACK);
            }
            if (now - this.bubbleAttackStartedAt > this.bubbleAttackDuration) {
                this.isBubbleAttacking = false;
            }
            return true;
        }
        return false;
    }

    handleCinematicDeath() {
        if (!this.isCinematicDead) return false;
        this.playAnimation(this.IMAGES_DEAD_CINEMATIC);
        return true;
    }

    handleDeath() {
        if (!this.isDead()) return false;
        if (this.lastDamageType === 'electro') {
            this.playAnimation(this.IMAGES_ELECTRODEAD);
        } else {
            this.playAnimation(this.IMAGES_POISENED);
        }
        return true;
    }

    handleHurt() {
        if (!this.isHurt()) return false;
        if (this.lastDamageType === 'electro') {
            this.playAnimation(this.IMAGES_ELECTROHURT);
        } else {
            this.playAnimation(this.IMAGES_POIHURT);
        }
        return true;
    }

    handleMovement() {
        if (
            this.world.keyboard.RIGHT ||
            this.world.keyboard.LEFT ||
            this.world.keyboard.UP ||
            this.world.keyboard.DOWN
        ) {
            this.playAnimation(this.IMAGES_SWIN);
            return true;
        }
        return false;
    }

    handleIdle() {
        if (this.world && this.world.bossFightStarted && !this.isDead()) {
            this.playAnimation(this.IMAGES_IDLE);
            return;
        }

        let idleTime = Date.now() - this.lastActionTime;
        if (idleTime > 10000) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    setDamageType(type) {
        this.lastDamageType = type;
    }

    startBubbleAttackAnimation(type = 'normal') {
        this.lastActionTime = Date.now();
        this.isChargingBubble = true;
        this.isBubbleAttacking = false;
        this.bubbleAttackType = type || 'normal';
        this.bubbleAttackStartedAt = Date.now();
        this.currentImage = 0;
    }

    startFinSlapAttackAnimation() {
        this.lastActionTime = Date.now();
        if (this.isFinSlapAttacking) return;
        this.isFinSlapAttacking = true;
        this.finSlapAttackStartedAt = Date.now();
        this.currentImage = 0;
    }
}