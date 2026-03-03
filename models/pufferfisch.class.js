class pufferfisch extends movableObject {

    height = 80;
    width = 80;

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
        
    ];

    IMAGES_TRANSITION_ROSE = [
        
    ];

    IMAGES_TRANSITION_GREEN = [
        
    ];

    IMAGES_BUBBLESWIM_PINK = [
        
    ];

    IMAGES_BUBBLESWIM_ROSE = [
        
    ];

    IMAGES_BUBBLESWIM_GREEN = [
        
    ];

    IMAGES_DIE_PINK = [
        
    ];

    IMAGES_DIE_ROSE = [
        
    ];

    IMAGES_DIE_GREEN = [
        
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 20,
    }


    constructor(color = 'pink') {
        super()
        this.images = 
        color === 'rose' ? this.IMAGES_MOVE_ROSE :
        color === 'green' ?  this.IMAGES_MOVE_GREEN :
        this.IMAGES_MOVE_PINK;

        this.loadImage(this.images[0]);
        this.loadImages(this.images);

        this.x = 1440 + Math.random() * 500;
        this.y = 140 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate(){
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.images);
        }, 200);
    }
}