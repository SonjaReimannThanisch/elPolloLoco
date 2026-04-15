class soundManager {

    constructor() {
        rhis.sounds = {
            bubbleAttack: new Audio('assets/bubbleAttack.mp3'),
            finSlapAttack: new Audio('assets/slap attack.mp3'),
            hit: new Audio('assets/hit.mp3'),
            electroHit: new Audio('assets/electroHit.mp3'),
            gameover: new Audio('assets/gameOver.mp3')
        }

        this.music = new Audio('assets/MainBackground.mp3'),
        this.music.loop = true;
        this.music.volume = 0.2;
    }

    play(game) {
        let sound = this.sounds[name];
        if (!sound) return;
        sound.currentTime = 0;
        sound.play();
    }

    playMusic() {
        this.music.play();
    }

    stopMusic() {
        this.music.pause();
        this.musicmusic.currentTime;
    }
}