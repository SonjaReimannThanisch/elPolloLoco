class world {
    mainCharacter = new character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusLife;
    statusCoins;
    statusPoison;

    attacks = [];
    lastFinSlapAt = 0;
    lastBubbleAt = 0;
    finSlapCoolsdowns = 400;
    bubbleCooldowns = 900;

    lastX = 0;
    lastY = 0;
    isGameOver = false;
    TILE_WIDTH = 720;
    enemyCollisionInterval = null;
    hasStarted = false;

    bossTriggerX = 3600;
    bossFightStarted = false;
    bubbles = [];

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.level = createLevel1();
        this.keyboard = keyboard;
        this.keyboardSprite = new Keyboard(canvas.width, canvas.height);
        this.statusLife = new statusBar('life');
        this.statusCoins = new statusBar('coins');
        this.statusPoison = new statusBar('poison');
        this.statusLife.y = 45;
        this.statusCoins.y = 80;
        this.statusPoison.y = 10;
        this.setWorld();
        this.bindUi();
        this.draw();
    }

    startGame() {
        if(this.hasStarted) return;
        this.hasStarted = true;
        this.mainCharacter.animate();
        // this.draw();
        this.checkCollisions();
    }

    setWorld() {
        this.mainCharacter.world = this;
    }

    triggerGameOverIfDead() {
        if (this.mainCharacter.energy <= 0 && !this.isGameOver) {
            this.isGameOver = true;
            this.showGameOver();
        }
    }

    gameOverCollisionIntervall() {
        if (this.enemyCollisionInterval) {
        clearInterval(this.enemyCollisionInterval);
        this.enemyCollisionInterval = null;
        }
    }

    applyDamage(amount = 5) {
        this.mainCharacter.energy -= amount;
        
        if ( this.mainCharacter.energy < 0) {
            this.mainCharacter.energy = 0;
        } else {
            this.mainCharacter.lastHit = new Date().getTime();
        }
        
        this.statusLife.setPercentage(this.mainCharacter.energy);
        this.triggerGameOverIfDead();
    }

    checkCollisions() {
        if (this.enemyCollisionInterval) return;
        this.enemyCollisionInterval = setInterval(this.runEnemyCollisionCheck.bind(this), 1000);
    }

    runEnemyCollisionCheck() {
        this.level.enemies.forEach(this.checkEnemyCollision.bind(this));
    }

    checkEnemyCollision(enemy) {
        if (enemy.isDead) return;
        if (this.mainCharacter.isColliding(enemy) && !this.mainCharacter.isHurt()) {
            this.applyDamage(enemy.damage || 5);
        }
    }

    checkAttackCollisions() {
        for (let i = 0; i < this.attacks.length; i++) {
            let attack = this.attacks[i];
            if (attack.hasHit) continue;

            for (let j = 0; j < this.level.enemies.length; j++) {
            let enemy = this.level.enemies[j];

                if ( attack instanceof BubbleTrapAttack && !(enemy instanceof jellyfisch)) {
                    continue;
                }

                if ( attack instanceof FinSlapAttack && !(enemy instanceof pufferfisch)) {
                    continue;
                }

                if (attack.isColliding(enemy)) {
                    enemy.hit();
                    attack.hitTarget();
                    break;
                }
            }
        }
    }

    updateAttacks(now) {
        for (let i=0; i < this.attacks.length; i++) {
            let attack = this.attacks[i];
            if (typeof attack.tick === `function`) {
                attack.tick(now);
            }
            if (attack.vx) {
                attack.x += attack.vx;
            }
        }
    }

    cleanupAttacks() {
        this.attacks = this.attacks.filter(a => !a.isExpired() && !a.markedForDeletion);
    }

    isCollidingWithAnyBarrier() {
        return this.level.barriers.some(b => this.mainCharacter.isColliding(b));
    }

    resetPlayerToLastPosition() {
        this.mainCharacter.x = this.lastX;
        this.mainCharacter.y = this.lastY;
    }

    rememberPlayerPosition() {
        this.lastX = this.mainCharacter.x;
        this.lastY = this.mainCharacter.y;
    }

    getEndboss() {
        return this.level.enemies.find(e => e instanceof Endboss)
    }

    checkBarrierCollision() {
        let hitBarrier = this.isCollidingWithAnyBarrier();
        let boss = this.getEndboss();
        let hitBoss = boss && boss.isCollidable() && this.mainCharacter.isColliding(boss);
        if (!hitBarrier && !hitBoss) {
            this.rememberPlayerPosition();
            return;}
        this.resetPlayerToLastPosition();
        if (this.isPressingIntoBarrier() && !this.mainCharacter.isHurt()) {
            this.applyDamage();
        }
    }   

    showGameOver() {
        document.getElementById('gameover')?.classList.remove('hidden');
    }
    
    hideGameOver() {
        document.getElementById('gameover')?.classList.add('hidden');
    }

    bindUi() {
        let restartBtn = document.getElementById('btn-restart');
        if (restartBtn) {
            restartBtn.onclick = () => this.restartGame();
        }
        let homeBtn  = document.getElementById('btn-home');
        if (homeBtn ) {
            homeBtn .onclick = () => this.goHome();
        }
    }

    isPressingIntoBarrier() {
        return this.keyboard.LEFT || this.keyboard.RIGHT || this.keyboard.UP || this.keyboard.DOWN;
    }

    checkCoinCollision() {
        this.level.coins.forEach((coin, i) => {
            if (this.mainCharacter.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.mainCharacter.coins = Math.min(100, (this.mainCharacter.coins || 0) + 10);
                this.statusCoins.setPercentage(this.mainCharacter.coins);
            }
        });
    }

    checkPoisonCollision() {
        this.level.poison.forEach((poison, i) => {
            if (this.mainCharacter.isColliding(poison)) {
            this.level.poison.splice(i, 1);
            this.mainCharacter.bottle = Math.min(100, (this.mainCharacter.bottle || 0) + 10);
            this.statusPoison.setPercentage(this.mainCharacter.bottle);
            }
        });
    }

    updateBackground() {
        let w = this.TILE_WIDTH;
        let groups = [
            this.level.background.slice(0, 2),
            this.level.background.slice(2, 4),
            this.level.background.slice(4, 6),
        ];
        let leftEdge = -this.camera_x;
        let rightEdge = leftEdge + w;
        groups.forEach(g => {
            g.forEach(bg => {
            if (bg.x + w < leftEdge) bg.x += w * g.length
            if (bg.x > rightEdge) bg.x -= w * g.length;
            });
        });
    }

    updateLights() {
        let w = this.TILE_WIDTH;
        let leftEdge = -this.camera_x;
        let rightEdge = leftEdge + w;
        let t = performance.now() / 1000;
        this.level.lights.forEach(light => {
            light.update(t);
            if (light.x + w < leftEdge) light.x += w * this.level.lights.length;
            if (light.x > rightEdge)    light.x -= w * this.level.lights.length;
        });
    }

    isRunningGame() {
        return this.hasStarted && !this.isGameOver;
    }

    draw() {
        this.beginFrame();
        if (this.isRunningGame()) this.updateWorldState();
        this.drawWorldLayer();
        this.drawHudLayer();
        this.endFrame();
    }

    beginFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.camera_x = Math.min(0, -this.mainCharacter.x);
    }

    updateWorldState() {
        let now = Date.now();
        this.updateBackground();
        this.updateLights();
        this.checkBarrierCollision();
        this.checkCoinCollision();
        this.checkPoisonCollision();
        this.checkMenuInput();
        this.level.enemies = this.level.enemies.filter(e => !e.markedForDeletion);
        this.checkEndbossTrigger();

        let boss = this.getEndboss();
        if (boss) boss.update();
        this.handleAttackInput(now);
        this.updateAttacks(now);
        this.checkAttackCollisions();
        this.cleanupAttacks();
    }

    drawWorldLayer() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.barriers);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poison);
       
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.mainCharacter);
        this.addObjectsToMap(this.attacks);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawHudLayer() {
        this.addToMap(this.statusLife);
        this.addToMap(this.statusCoins);
        this.addToMap(this.statusPoison);
    }

    endFrame() {
        requestAnimationFrame(this.draw.bind(this));
    }

    restartGame() {
        this.hideGameOver();
        this.resetWorldState();
        this.hasStarted = true;
        this.mainCharacter.animate();
        this.checkCollisions();
        this.draw();
    }

    resetWorldState() {
        clearInterval(this.enemyCollisionInterval);
        this.enemyCollisionInterval = null;
        this.camera_x = 0;
        this.attacks = [];
        this.bubbles = [];
        this.bossFightStarted = false;
        this.isGameOver = false;
        this.hasStarted = false;
        this.lastFinSlapAt = 0;
        this.lastBubbleAt = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.level = createLevel1();
        this.mainCharacter = new character();
        this.setWorld();   
        this.statusLife.setPercentage(this.mainCharacter.energy);
        this.statusCoins.setPercentage(0);
        this.statusPoison.setPercentage(0);     
    }

    handleAttackInput() {
        if (!this.hasStarted || this.isGameOver) return;
        let now =Date.now();
        if (this.keyboard.SPACE) this.tryFinSlap(now);
        if (this.keyboard.A) this.tryBubble(now);
    }

    tryFinSlap(now) {
        if (now - this.lastFinSlapAt < this.finSlapCoolsdowns) return;
        let activeFinSlap = this.attacks.some(a => a instanceof FinSlapAttack);
        if (activeFinSlap) return;
        this.mainCharacter.startFinSlapAttackAnimation();
        let attack = new FinSlapAttack(this.mainCharacter);
        this.attacks.push(attack);
        this.lastFinSlapAt = now;
        this.keyboard.SPACE = false;
    }

    tryBubble(now) {
        if (now - this.lastBubbleAt < this.bubbleCooldowns) return;
        this.mainCharacter.startBubbleAttackAnimation();
        setTimeout(() => {
            let attack = new BubbleTrapAttack(this.mainCharacter);
            this.attacks.push(attack);
        }, 150);
        this.lastBubbleAt = now;
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        const prevAlpha = this.ctx.globalAlpha;
        if (mo.alpha !== undefined) this.ctx.globalAlpha = mo.alpha;
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        if (mo.drawFrame) mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
        this.ctx.globalAlpha = prevAlpha;
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    stopGame() {
        if ( this.enemyCollisionInterval) {
            clearInterval(this.enemyCollisionInterval);
            this.enemyCollisionInterval = null;
        }
        this.isGameOver = true;
        this.hasStarted = false;
    }

    goHome() {
        this.hideGameOver();
        this.resetWorldState();
        document.getElementById('startscreen')?.classList.remove('hidden');
    }

    checkMenuInput() {
        if (!this.keyboard.ESC) return;
        if (document.fullscreenElement) return;
        this.goHome();
        this.keyboard.ESC = false;
    }

    checkEndbossTrigger() {
        if ( this.bossFightStarted) return;
        let boss = this.getEndboss();
        if (!boss) return;
        if (this.mainCharacter.x >=this.bossTriggerX) {
            this.bossFightStarted = true;
            boss.startIntro();
        }
    }
}
