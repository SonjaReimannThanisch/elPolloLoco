let canvas = [];
let ctx;
let character = new movableObject();

function init() {
    canvas = document.getElementById('backgroundCanvas');
    ctx = canvas.getContext('2d');

    console.log('My Charakter is', character);
    
}