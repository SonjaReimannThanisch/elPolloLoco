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
    _isHurt = false;
    isAttacking = false;
    attackCooldown = 1800;
    attackDuration= 1200;
    attackSpeed = 3;
    lastAttackAt = 8;
    attackDirection = 1;
    isDead = false;
    damage = 35;
    damageType = 'poison';

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

    IMAGES_IDLE = [
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

    IMAGE_RECOVERY = [
        'img/2.Enemy/3 Final Enemy/Dead/recovered.png',
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
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.finalX;
        this.y = -520;
        
    }

    startIntro() {
        if (this.isAwakened) return;
        this.isAwakened = true;
        this.isIntroducing = true;
        this.isHurt = false;
        this.startAnimationLoop();
    }

    update() {
        if (this.isIntroducing) {
            this.y += this.introSpeedY;
    
            if (this.y >= this.finalY) {
                this.y = this.finalY;
                this.isIntroducing = false;
                this.isActive = true;
                this.lastAttackAt = Date.now() - this.attackCooldown;
            }
            return;
        }
        if (!this.isActive || this.isDead) return;
        let now = Date.now();
        this.x = Math.max(3600, Math.min(this.x, 4550));

        if (!this.isAttacking && !this._isHurt) {
            if (now - this.lastAttackAt >= this.attackCooldown) {
                this.startAttack();
            }
        }

        if (this.isAttacking) {
            let player = this.world.mainCharacter;
            let bossCenterX = this.x + this.width / 2;
            let playerCenterX = player.x + player.width / 2;
            let distanceToPlayer = Math.abs(playerCenterX - bossCenterX);

            if (distanceToPlayer > 150) {
                this.x += this.attackDirection * this.attackSpeed;
            }

            if (now - this.attackStartedAt >= this.attackDuration || distanceToPlayer <= 80) {
                this.stopAttack();
            }
        }
    }

    startAttack() {
        if (!this.world) return;
        let player = this.world.mainCharacter;
        let dy = player.y - this.y;
        this.y += dy * 0.02;
        let bossCenterX = this.x + this.width / 2;
        let playerCenterX = player.x + player.width / 2;
        this.attackDirection = playerCenterX < bossCenterX ? -1 : 1;
        this.otherDirection = this.attackDirection === 1;
        this.attackSpeed = 2;
        this.isAttacking= true;
        this.attackStartedAt = Date.now();
    }

    stopAttack() {
        this.isAttacking= false;
        this.lastAttackAt = Date.now();
    }



    startAnimationLoop(){
        setInterval(() => {
            if ( this.isIntroducing) {
                this.playAnimation(this.IMAGES_INTRO);
            } else if (this.isActive && this._isHurt) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isActive && this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.isActive) {
                this.playAnimation(this.IMAGES_IDLE)
            }else if (!this.isActive && this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);
    }

    isCollidable() {
        return this.isActive;
    }

    hit(type = 'normal') {
        if (!this.isActive || this.isDead) return;
        if (type === 'poison') {
            this.energy -= 20;
        } else {
            this.energy -= 5;
        }
        this._isHurt = true;
        if (this.isAttacking) {
            this.stopAttack();
        }
        setTimeout(() => {
            this._isHurt = false;
        }, 300);
        if (this.energy <= 0) {
            this.die();
        }
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.isActive = false;
        this._isHurt = false;
        this.isAttacking = false;
        this.playAnimation(this.IMAGES_DEAD);
    }
}