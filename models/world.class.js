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
    lastX = 0;
    lastY = 0;
    isGameOver = false;
    TILE_WIDTH = 720;
    enemyCollisionInterval = null;




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
        this.mainCharacter.animate();
        this.bindUi();
        this.draw();
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

    applyDamage() {
        this.mainCharacter.hit();
        this.statusLife.setPercentage(this.mainCharacter.energy);
        this.triggerGameOverIfDead();
    }

    checkCollisions() {
        if (this.enemyCollisionInterval) return;
        this.enemyCollisionInterval = setInterval(() => {
            this.level.enemies.forEach(enemy => {
            if (this.mainCharacter.isColliding(enemy)) {
                this.applyDamage();
            }
            });
        }, 1000);
    }


    checkAttackCollisions() {
        this.attacks.forEach((attack) => {
            this.level.enemies.forEach((enemy) => {
                if (!attack.hasHit && attack.isColliding(enemy)) {
                    enemy.hit();
                    attack.hasHit = true;
                }
            });
        });
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

    checkBarrierCollision() {
        let hit = this.isCollidingWithAnyBarrier();
        if (!hit) {
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
        const restartBtn = document.getElementById('btn-restart');
        if (restartBtn) {
            restartBtn.onclick = () => this.restartGame();
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
            console.log('bottle value', this.mainCharacter.bottle);
            this.statusPoison.setPercentage(this.mainCharacter.bottle);
            console.log('poison list', this.level.poison.length);
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

    draw() {
        if (this.isGameOver) return;
        this.beginFrame();
        this.updateWorldState();
        this.drawWorldLayer();
        this.drawHudLayer();
        this.endFrame();
    }

    beginFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.camera_x = Math.min(0, -this.mainCharacter.x);
    }

    updateWorldState() {
        this.updateBackground();
        this.updateLights();
        this.checkBarrierCollision();
        this.checkAttackCollisions();
        this.checkCoinCollision();
        this.checkPoisonCollision();
        this.attacks = this.attacks.filter(a => !a.isExpired());
    }

    drawWorldLayer() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.barriers);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.attacks);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.mainCharacter); 
        this.addToMap(this.keyboardSprite);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawHudLayer() {
        this.addToMap(this.statusLife);
        this.addToMap(this.statusCoins);
        this.addToMap(this.statusPoison);
    }

    endFrame() {
        requestAnimationFrame(() => this.draw());
    }

    restartGame() {
        clearInterval(this.enemyCollisionInterval);
        this.enemyCollisionInterval = null;
        this.hideGameOver();
        this.isGameOver = false;
        this.camera_x = 0;
        this.attacks = [];
        this.mainCharacter = new character();
        this.setWorld();
        this.mainCharacter.animate();
        this.level = createLevel1();
        this.statusLife.setPercentage(this.mainCharacter.energy);
        this.statusCoins.setPercentage(0);
        this.statusPoison.setPercentage(0);
        this.checkCollisions();
        this.draw();
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

}
