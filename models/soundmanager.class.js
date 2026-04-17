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
        this.music = new Audio('assets/musicword-bubbles-309433.mp3'),
        this.music.loop = true;
        this.menuMusic.loop = true;
        this.music.volume = 0.2;
        this.menuMusic.volume = 0.2;
        this.menuMusic.playbackRate = 1.4;
    }



    playMenu() {
        if (this.isMuted) return;
        this.currentTrack = 'menu';
        this.music.pause();
        this.menuMusic.currentTime = 0;
        this.menuMusic.play();
        this.menuMusic.addEventListener('timeupdate', () => {
            if (this.menuMusic.currentTime > this.menuMusic.duration - 0.3) {
                this.menuMusic.currentTime = 0;
                this.menuMusic.play();
            }
        });
    }

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