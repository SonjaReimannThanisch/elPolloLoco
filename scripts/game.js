let canvas;
let ctx;
let gameWorld;

function init() {
    canvas = document.getElementById('backgroundCanvas');
    ctx = canvas.getContext('2d');
    gameWorld = new World();

    console.log('My character is', gameWorld.character);
}