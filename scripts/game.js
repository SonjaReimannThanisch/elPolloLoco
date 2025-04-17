let canvas = [];
let ctx;
let world = new world();

function init() {
    canvas = document.getElementById('backgroundCanvas');
    ctx = canvas.getContext('2d');

    console.log('My character is', world.character);
    
}