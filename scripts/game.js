let canvas;
let gameWorld;
let keyboard = new Keyboard();

function init() {
  injectStartScreen();

  canvas = document.getElementById('backgroundCanvas');
  keyboard = new Keyboard(canvas.width, canvas.height);
  gameWorld = new world(canvas, keyboard);
  bindStartUi(gameWorld);

}

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") keyboard.RIGHT = true;
  if (event.code === "ArrowLeft") keyboard.LEFT = true;
  if (event.code === "ArrowUp") keyboard.UP = true;
  if (event.code === "ArrowDown") keyboard.DOWN = true;

  if (event.code === "KeyD") keyboard.ATTACK  = true;
  if (event.code === "KeyA") keyboard.ATTACK  = true;

  if (event.code === "Space") keyboard.SPACE = true;
  if (event.code === "Escape") keyboard.ESC = true;

});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") keyboard.RIGHT = false;
  if (event.code === "ArrowLeft") keyboard.LEFT = false;
  if (event.code === "ArrowUp") keyboard.UP = false;
  if (event.code === "ArrowDown") keyboard.DOWN = false;

  if (event.code === "KeyD") keyboard.ATTACK  = false;
  if (event.code === "KeyA") keyboard.ATTACK  = false;

  if (event.code === "Space") keyboard.SPACE = false;
  if (event.code === "Escape") keyboard.ESC = false;

});


// window.addEventListener("keydown", (event) => {
//     if(event.keyCode   == 39) {
//         keyboard.RIGHT = true;
//     }
//     if(event.keyCode == 37) {
//         keyboard.LEFT = true;
//     }
//     if(event.keyCode == 38) {
//         keyboard.UP = true;
//     }
//     if(event.keyCode == 40) {
//         keyboard.DOWN = true;
//     }
//     if(event.keyCode == 32) {
//         keyboard.SPACE = true;
//     }
//     if (event.keyCode == 68) {
//         keyboard.D = true;
//     }
//     if (event.keyCode == 65) {
//         keyboard.A = true;
//     }
//     console.log('A:', keyboard.A, 'D:', keyboard.D);

//     // console.log(event);
// }); 

// window.addEventListener("keyup", (event) => {
//     if(event.keyCode   == 39) {
//         keyboard.RIGHT = false;
//     }
//     if(event.keyCode == 37) {
//         keyboard.LEFT = false;
//     }
//     if(event.keyCode == 38) {
//         keyboard.UP = false;
//     }
//     if(event.keyCode == 40) {
//         keyboard.DOWN = false;
//     }
//     if(event.keyCode == 32) {
//         keyboard.SPACE = false;
//     }
//     if (event.keyCode == 68) {
//         keyboard.D = false;
//     }
//     if (event.keyCode == 65) {
//         keyboard.A = false;
//     }
//     // console.log(event);
// }); 


// document.addEventListener("keydown", keyDownHandler);
// document.addEventListener("keyup", keyUpHandler);


