class pufferfisch extends movableObject {

    height = 80;
    width = 80;
    isDead = false;
    markedForDeletion = false;
    energy = 100;
    hasHit = false;;

    IMAGES_MOVE_PINK = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png'
    ];
    IMAGES_MOVE_ROSE = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png'
    ];
    IMAGES_MOVE_GREEN = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    IMAGES_TRANSITION_PINK = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png',
    ];

    IMAGES_TRANSITION_ROSE = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png',
    ];

    IMAGES_TRANSITION_GREEN = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
    ];

    IMAGES_BUBBLESWIM_PINK = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png',
    ];

    IMAGES_BUBBLESWIM_ROSE = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png',
    ];

    IMAGES_BUBBLESWIM_GREEN = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png',
    ];

     IMAGES_DIE_PINK = [
         'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png',
         'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png',
         'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png',
     ];

     IMAGES_DIE_ROSE = [
         'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
         'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
         'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
     ];

     IMAGES_DIE_GREEN = [
         'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
         'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
         'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
     ]; 


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 20,
    }


    constructor(color = 'pink') {
        super()
        this.type = color;
        this.images = 
            color === 'rose' ? this.IMAGES_MOVE_ROSE :
            color === 'green' ?  this.IMAGES_MOVE_GREEN :
            this.IMAGES_MOVE_PINK;

        this.loadImage(this.images[0]);
        this.loadImages(this.images);
        this.loadImages(this.IMAGES_DIE_GREEN);
        this.loadImages(this.IMAGES_DIE_ROSE);
        this.loadImages(this.IMAGES_DIE_PINK);

        this.x = 1440 + Math.random() * 500;
        this.y = 140 + Math.random() * 200;
        this.speed = 0.6 + Math.random() * 0.7;
        this.animate();
    }

    hit() {
        if ( this.isDead) return;
        this.energy -= 100;
        if ( this.energy <= 0) {
            this.isDead = true;
            this.speed = 0;
            setTimeout(() => {
                this.markedForDeletion = true;
            }, 500);
        }
    }

    animate(){
        setInterval(() => {
            if (!this.isDead) {
                this.x -= this.speed;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.getDieImages());
            } else {
                this.playAnimation(this.images);
            }
        }, 200);
    }

    getDieImages() {
        if (this.type === 'pink') return this.IMAGES_DIE_PINK;
        if (this.type === 'rose') return this.IMAGES_DIE_ROSE;
        if (this.type === 'green') return this.IMAGES_DIE_GREEN;
    }

}