class world {
    mainCharacter = new character();
    level;
    canvas;
    ctx;
    sound;
    keyboard;
    camera_x = 0;
    statusLife;
    statusCoins;
    statusPoison;
    hasPlayerMoved = false;

    attacks = [];
    lastFinSlapAt = 0;
    lastBubbleAt = 0;
    finSlapCooldowns  = 400;
    bubbleCooldowns = 900;

    lastX = 0;
    lastY = 0;
    isGameOver = false;

    hasWon = false;

    TILE_WIDTH = 720;
    enemyCollisionInterval = null;
    hasStarted = false;

    bossTriggerX = 3600;
    bossFightStarted = false;
    bubbles = [];

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.level = createLevel1();
        // this.sound = new SoundManager();
        this.initHud();
        this.initUi();
        this.initWorldState();
        this.draw();
    }

    initHud() {
        this.keyboardSprite = new Keyboard(canvas.width, canvas.height);
        this.statusLife = new statusBar('life');
        this.statusCoins = new statusBar('coins');
        this.statusPoison = new statusBar('poison');
        this.statusLife.y = 45;
        this.statusCoins.y = 80;
        this.statusPoison.y = 10;
    }

    initUi() {
        this.bindUi();
        this.winScreen = new WinScreen(this.canvas.width, this.canvas.height);
    }

    initWorldState() {
        this.setWorld();
        this.setWorldForLevelObjects();
    }

    startGame() {
        if(this.hasStarted) return;
        this.hasStarted = true;
        // this.sound.menuMusic.pause();
        // this.sound.playMusic();
        this.mainCharacter.animate();
        this.checkCollisions();
    }

    setWorld() {
        this.mainCharacter.world = this;
    }

    triggerGameOverIfDead() {
        if (this.mainCharacter.energy <= 0 && !this.isGameOver) {
            this.isGameOver = true;
            if (this.mainCharacter.deathCause === 'boss') {
                this.mainCharacter.isCinematicDead = true;
                setTimeout(() => {
                    this.showGameOver();
                }, 1500);
            } else {
                this.showGameOver();
            }
        }
    }

    applyDamage(amount = 5, type = 'poison', cause = '') {
        this.mainCharacter.setDamageType(type);
        this.mainCharacter.deathCause = cause;
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
            let cause = enemy instanceof Endboss ? 'boss' : ''
            this.applyDamage(enemy.damage || 5, enemy.damageType || 'poison', cause);
        }
    }

    checkAttackCollisions() {
        for (let i = 0; i < this.attacks.length; i++) {
            let attack = this.attacks[i];
            if (attack.hasHit) continue;

            for (let j = 0; j < this.level.enemies.length; j++) {
            let enemy = this.level.enemies[j];

                if (attack instanceof BubbleTrapAttack && !(enemy instanceof jellyfisch) && !(enemy instanceof Endboss)) {
                    continue;
                }

                if (attack instanceof FinSlapAttack && !(enemy instanceof pufferfisch)) {
                    continue;
                }

                if (attack.isColliding(enemy)) {
                    if (attack instanceof FinSlapAttack) {
                        enemy.hit('finSlap');
                    } else if (attack instanceof BubbleTrapAttack) {
                        enemy.hit(attack.type);
                    } else {
                        enemy.hit('normal');
                    }
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
        if (!this.isBlockedByBarrierOrBoss()) {
            this.rememberPlayerPosition();
            return;
        }
        this.resetPlayerToLastPosition();
        this.applyBarrierDamage();
    }

    isBlockedByBarrierOrBoss() {
        let hitBarrier = this.isCollidingWithAnyBarrier();
        let boss = this.getEndboss();
        let hitBoss = boss && boss.isCollidable() && this.mainCharacter.isColliding(boss);
        return hitBarrier || hitBoss;
    }

    applyBarrierDamage() {
        if (this.isPressingIntoBarrier() && !this.mainCharacter.isHurt()) {
            this.applyDamage(5, 'poison');
        }
    }

    showGameOver() {
        // this.sound.stopMusic();
        this.freezeBossForGameOver();
        this.lockCameraOnPlayer();
        document.getElementById('gameover')?.classList.remove('hidden');
    }

    freezeBossForGameOver() {
        let boss = this.getEndboss();
        if (boss) {
            boss.isAttacking = false;
        }
    }

    lockCameraOnPlayer() {
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

    setWorldForLevelObjects() {
        this.level.enemies.forEach(enemy => enemy.world = this);
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
        this.updateEnvironment();
        this.updateCollectibles();
        this.updateMenuState();
        this.updateEnemies();
        this.updateBossFight();
        this.updateCombat();
    }

    updateEnvironment() {
        this.updateBackground();
        this.updateLights();
        this.checkBarrierCollision();
    }

    updateCollectibles() {
        this.checkCoinCollision();
        this.checkPoisonCollision();
    }

    updateMenuState() {
        this.checkMenuInput();
    }

    updateEnemies() {
        this.level.enemies = this.level.enemies.filter(e => !e.markedForDeletion);
    }

    updateBossFight() {
        this.checkEndbossTrigger();
        this.handleBossState();
    }

    updateCombat(now) {
        this.checkAttackCollisions();
        this.cleanupAttacks();
        this.handleAttackInput(now);
        this.updateAttacks(now);
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
        this.drawHudWonLayer();
    }

    // drawHudWonLayer() {
    //     if (this.hasWon) {
    //         if (this.winScreen.alpha < 2) {
    //             this.winScreen.alpha += 0.02;
    //         }
    //         this.addToMap(this.winScreen);
    //     }
    // }

    drawHudWonLayer() {
        if (!this.hasWon) return;
        this.ctx.save();
        let overlayAlpha = Math.min(this.winScreen.alpha, 0.9);
        this.ctx.globalAlpha = overlayAlpha;
        this.ctx.fillStyle = "rgba(10, 3, 37, 0.75)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
        if (this.winScreen.alpha < 1) {
            this.winScreen.alpha += 0.02;
        }
        this.addToMap(this.winScreen);
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
    }

    resetWorldState() {
        this.resetIntervals();
        this.resetFlags();
        this.resetCollections();
        this.resetLevelState();
        this.resetHudState();
        this.resetWinState();  
    }
    
    resetIntervals() {
        clearInterval(this.enemyCollisionInterval);
        this.enemyCollisionInterval = null;
    }

    resetFlags() {
        this.hasPlayerMoved = false;
        this.bossFightStarted = false;
        this.isGameOver = false;
        this.hasStarted = false;
        this.hasWon = false;
    }

    resetCollections() {
        this.attacks = [];
        this.bubbles = [];
        this.lastFinSlapAt = 0;
        this.lastBubbleAt = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.camera_x = 0;
    }

    resetLevelState() {
        this.level = createLevel1();
        this.mainCharacter = new character();
        this.setWorld();
        this.setWorldForLevelObjects();
    }

    resetHudState() {
        this.statusLife.setPercentage(this.mainCharacter.energy);
        this.statusCoins.setPercentage(0);
        this.statusPoison.setPercentage(0);
    }

    resetWinState() {
        this.winScreen = new WinScreen(this.canvas.width, this.canvas.height);
    }

    handleBossState() {
        if (!this.bossFightStarted) return;
        let boss = this.getEndboss();
        if (!boss) return;
        boss.update();
            if (boss.isDead && !this.hasWon) {
                this.hasWon = true;
        }
    }

    handleAttackInput() {
        if (!this.hasStarted || this.isGameOver) return;
        let now =Date.now();
        if (this.keyboard.SPACE) this.tryFinSlap(now);
        if (this.keyboard.A) this.tryBubble(now);
    }

    tryFinSlap(now) {
        if (now - this.lastFinSlapAt < this.finSlapCooldowns ) return;
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
        let type = 'normal';
        let boss = this.getEndboss();
        if (boss && boss.isActive) {
            type = 'poison';
        }
        this.mainCharacter.startBubbleAttackAnimation(type);
        setTimeout(() => {
            let attack = new BubbleTrapAttack(this.mainCharacter, type);
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

    goHome() {
        // this.sound.stopMusic();
        // this.sound.playMenu();
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
