class SoundManager {
    currentTrack = 'menu';

    constructor() {
        this.isMuted = false;
        this.sounds = {
            bubbleAttack: new Audio('assets/bubbleAttack.mp3'),
            finSlapAttack: new Audio('assets/slap attack.mp3'),
            hit: new Audio('assets/hit.mp3'),
            electroHit: new Audio('assets/electroHit.mp3'),
            gameover: new Audio('assets/gameOver.mp3')
        }
        this.menuMusic = new Audio('assets/waterBackground.mp3')
        this.music = new Audio('assets/MainBackground.mp3'),
        this.music.loop = true;
        this.menuMusic.loop = true;
        this.music.volume = 0.2;
        this.menuMusic.volume = 0.2;
    }



    playMenu() {
        if (this.isMuted) return;
        this.currentTrack = 'menu';
        this.music.pause();
        this.menuMusic.currentTime = 0;
        this.menuMusic.play();
    }

    // play(name) {
    //     if ( this.isMuted) return;
    //     let sound = this.sounds[name];
    //     if (!sound) return;
    //     sound.currentTime = 0;
    //     sound.play();
    // }

    playMusic() {
        if (this.isMuted) return;
        this.currentTrack = 'game';
        this.menuMusic.pause();
        this.music.currentTime = 0;
        this.music.play();
    }

    toggleMusic() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopAllMusic();
            return;
        }
        if (this.currentTrack === 'menu') {
            this.menuMusic.play();
        } else {
            this.music.play();
        }
    }

    stopAllMusic() {
        this.music.pause();
        this.menuMusic.pause();
    }
}