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

  if (event.code === "Space") keyboard.SPACE = true;
  if (event.code === "KeyA")  keyboard.A     = true;

  if (event.code === "Escape") keyboard.ESC = true;

});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") keyboard.RIGHT = false;
  if (event.code === "ArrowLeft") keyboard.LEFT = false;
  if (event.code === "ArrowUp") keyboard.UP = false;
  if (event.code === "ArrowDown") keyboard.DOWN = false;

  if (event.code === "Space") keyboard.SPACE = false;
  if (event.code === "KeyA")  keyboard.A     = false;

  if (event.code === "Escape") keyboard.ESC = false;

});


