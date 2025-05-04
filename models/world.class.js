class world {
    mainCharacter = new character();
    enemies = [
        new chicken(),
        new chicken(),
        new chicken(),
    ];

    ctx;

    constructor(ctx) {
        this.ctx = ctx;
        this.draw();
    }

    draw() {
        this.mainCharacter.draw(this.ctx);
        this.enemies.forEach(enemy => {
            enemy.draw(this.ctx);
        });
    }
}
